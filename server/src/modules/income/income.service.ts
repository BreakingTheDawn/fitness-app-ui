import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Withdrawal, WithdrawalStatus } from './entities/withdrawal.entity';
import { IncomeRecord, IncomeType } from './entities/income-record.entity';
import { Coach } from '../coach/entities/coach.entity';
import { Order, OrderStatus } from '../order/entities/order.entity';
import { WithdrawDto, QueryIncomeDto, QueryWithdrawalDto } from './income.dto';

// 平台佣金比例 (10%)
const COMMISSION_RATE = 0.1;

// 最小提现金额
const MIN_WITHDRAW_AMOUNT = 100;

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Withdrawal)
    private withdrawalRepository: Repository<Withdrawal>,
    @InjectRepository(IncomeRecord)
    private incomeRecordRepository: Repository<IncomeRecord>,
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  // 生成提现单号
  private generateWithdrawalNo(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = uuidv4().split('-')[0].toUpperCase();
    return `WD${timestamp}${random}`;
  }

  // 获取收益统计
  async getStats(coachId: number) {
    // 获取所有已完成的订单
    const orders = await this.orderRepository.find({
      where: { coachId, status: OrderStatus.COMPLETED },
    });

    // 计算总收益
    const totalIncome = orders.reduce(
      (sum, order) => sum + Number(order.totalPrice),
      0,
    );

    // 计算本月收益
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyOrders = orders.filter(
      (order) => order.completedAt && order.completedAt >= monthStart,
    );
    const monthlyIncome = monthlyOrders.reduce(
      (sum, order) => sum + Number(order.totalPrice),
      0,
    );

    // 计算可提现金额（已结算的净收入）
    const settledRecords = await this.incomeRecordRepository.find({
      where: { coachId, isSettled: true, type: IncomeType.COURSE },
    });
    const availableAmount = settledRecords.reduce(
      (sum, record) => sum + Number(record.netAmount),
      0,
    );

    // 计算已提现金额
    const successWithdrawals = await this.withdrawalRepository.find({
      where: { coachId, status: WithdrawalStatus.SUCCESS },
    });
    const withdrawnAmount = successWithdrawals.reduce(
      (sum, w) => sum + Number(w.amount),
      0,
    );

    // 待结算金额
    const pendingRecords = await this.incomeRecordRepository.find({
      where: { coachId, isSettled: false, type: IncomeType.COURSE },
    });
    const pendingAmount = pendingRecords.reduce(
      (sum, record) => sum + Number(record.netAmount),
      0,
    );

    return {
      totalIncome, // 累计收益
      monthlyIncome, // 本月收益
      availableAmount: availableAmount - withdrawnAmount, // 可提现金额
      pendingAmount, // 待结算金额
      withdrawnAmount, // 已提现金额
      totalOrders: orders.length, // 总订单数
      monthlyOrders: monthlyOrders.length, // 本月订单数
    };
  }

  // 获取收益记录列表
  async getRecords(
    coachId: number,
    query: QueryIncomeDto,
  ): Promise<[IncomeRecord[], number]> {
    const page = query.page || 1;
    const limit = query.limit || 10;

    const queryBuilder = this.incomeRecordRepository
      .createQueryBuilder('record')
      .where('record.coachId = :coachId', { coachId });

    // 日期筛选
    if (query.startDate) {
      queryBuilder.andWhere('record.createdAt >= :startDate', {
        startDate: new Date(query.startDate),
      });
    }
    if (query.endDate) {
      const endDate = new Date(query.endDate);
      endDate.setHours(23, 59, 59, 999);
      queryBuilder.andWhere('record.createdAt <= :endDate', { endDate });
    }

    queryBuilder
      .orderBy('record.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    return queryBuilder.getManyAndCount();
  }

  // 申请提现
  async withdraw(
    coachId: number,
    withdrawDto: WithdrawDto,
  ): Promise<Withdrawal> {
    // 检查教练是否存在
    const coach = await this.coachRepository.findOneBy({ id: coachId });
    if (!coach) {
      throw new NotFoundException('教练不存在');
    }

    // 检查提现金额
    if (withdrawDto.amount < MIN_WITHDRAW_AMOUNT) {
      throw new BadRequestException(`最小提现金额为 ${MIN_WITHDRAW_AMOUNT} 元`);
    }

    // 检查可提现余额
    const stats = await this.getStats(coachId);
    if (withdrawDto.amount > stats.availableAmount) {
      throw new BadRequestException('可提现余额不足');
    }

    // 计算手续费（暂定为0）
    const fee = 0;
    const actualAmount = withdrawDto.amount - fee;

    // 创建提现记录
    const withdrawal = this.withdrawalRepository.create({
      coachId,
      withdrawalNo: this.generateWithdrawalNo(),
      amount: withdrawDto.amount,
      fee,
      actualAmount,
      status: WithdrawalStatus.PENDING,
      bankName: withdrawDto.bankName,
      bankAccount: withdrawDto.bankAccount,
      realName: withdrawDto.realName,
    });

    return this.withdrawalRepository.save(withdrawal);
  }

  // 获取提现记录列表
  async getWithdrawals(
    coachId: number,
    query: QueryWithdrawalDto,
  ): Promise<[Withdrawal[], number]> {
    const page = query.page || 1;
    const limit = query.limit || 10;

    return this.withdrawalRepository.findAndCount({
      where: { coachId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  // 获取提现详情
  async getWithdrawalDetail(
    coachId: number,
    withdrawalId: number,
  ): Promise<Withdrawal> {
    const withdrawal = await this.withdrawalRepository.findOne({
      where: { id: withdrawalId, coachId },
    });

    if (!withdrawal) {
      throw new NotFoundException('提现记录不存在');
    }

    return withdrawal;
  }

  // 创建收益记录（订单完成时调用）
  async createIncomeRecord(
    coachId: number,
    orderId: number,
    amount: number,
    description: string,
  ): Promise<IncomeRecord> {
    // 计算佣金
    const commission = amount * COMMISSION_RATE;
    const netAmount = amount - commission;

    // 计算结算日期 (T+7)
    const settleDate = new Date();
    settleDate.setDate(settleDate.getDate() + 7);

    const record = this.incomeRecordRepository.create({
      coachId,
      orderId,
      type: IncomeType.COURSE,
      amount,
      commission,
      netAmount,
      settleDate,
      isSettled: false,
      description,
    });

    return this.incomeRecordRepository.save(record);
  }

  // 结算收益记录（定时任务调用）
  async settleRecords(): Promise<void> {
    const now = new Date();
    const recordsToSettle = await this.incomeRecordRepository.find({
      where: { isSettled: false },
    });

    for (const record of recordsToSettle) {
      if (record.settleDate && record.settleDate <= now) {
        record.isSettled = true;
        await this.incomeRecordRepository.save(record);
      }
    }
  }
}
