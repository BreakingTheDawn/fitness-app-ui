import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Order, OrderStatus } from './entities/order.entity';
import { Course } from '../course/entities/course.entity';
import { Coach, CoachStatus } from '../coach/entities/coach.entity';
import { User } from '../user/entities/user.entity';
import {
  CreateOrderDto,
  CancelOrderDto,
  VerifyOrderDto,
  QueryOrderDto,
} from './dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 生成订单号
  private generateOrderNo(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = uuidv4().split('-')[0].toUpperCase();
    return `ORD${timestamp}${random}`;
  }

  // 生成核销码
  private generateVerifyCode(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  // 创建订单
  async create(userId: number, createDto: CreateOrderDto): Promise<Order> {
    // 检查课程是否存在
    const course = await this.courseRepository.findOne({
      where: { id: createDto.courseId, isActive: true },
    });

    if (!course) {
      throw new NotFoundException('课程不存在或已下架');
    }

    // 检查教练是否存在
    const coach = await this.coachRepository.findOne({
      where: { id: createDto.coachId, status: CoachStatus.APPROVED },
    });

    if (!coach) {
      throw new NotFoundException('教练不存在或未认证');
    }

    // 检查课程容量（拼课）
    if (
      course.maxCapacity > 1 &&
      course.currentEnrolled >= course.maxCapacity
    ) {
      throw new BadRequestException('课程已满');
    }

    // 创建订单
    const order = this.orderRepository.create({
      orderNo: this.generateOrderNo(),
      userId,
      coachId: createDto.coachId,
      courseId: createDto.courseId,
      totalPrice: course.price,
      scheduleTime: createDto.scheduleTime
        ? new Date(createDto.scheduleTime)
        : undefined,
      remark: createDto.remark,
      verifyCode: this.generateVerifyCode(),
      status: OrderStatus.PENDING,
    });

    const savedOrder = await this.orderRepository.save(order);

    // 更新课程报名人数
    if (course.maxCapacity > 1) {
      course.currentEnrolled += 1;
      await this.courseRepository.save(course);
    }

    return savedOrder;
  }

  // 获取订单详情
  async findOne(id: number): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'coach', 'course'],
    });

    if (!order) {
      throw new NotFoundException('订单不存在');
    }

    return order;
  }

  // 获取用户订单列表
  async findByUser(
    userId: number,
    page: number = 1,
    limit: number = 10,
    query?: QueryOrderDto,
  ): Promise<[Order[], number]> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.coach', 'coach')
      .leftJoinAndSelect('order.course', 'course')
      .where('order.userId = :userId', { userId });

    // 状态筛选
    if (query?.status) {
      queryBuilder.andWhere('order.status = :status', {
        status: query.status,
      });
    }

    queryBuilder
      .orderBy('order.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    return queryBuilder.getManyAndCount();
  }

  // 获取教练订单列表
  async findByCoach(
    coachId: number,
    page: number = 1,
    limit: number = 10,
    query?: QueryOrderDto,
  ): Promise<[Order[], number]> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.course', 'course')
      .where('order.coachId = :coachId', { coachId });

    if (query?.status) {
      queryBuilder.andWhere('order.status = :status', {
        status: query.status,
      });
    }

    queryBuilder
      .orderBy('order.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    return queryBuilder.getManyAndCount();
  }

  // 取消订单
  async cancel(
    id: number,
    userId: number,
    cancelDto: CancelOrderDto,
  ): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id, userId },
    });

    if (!order) {
      throw new NotFoundException('订单不存在');
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('订单状态不允许取消');
    }

    order.status = OrderStatus.CANCELLED;
    order.cancelReason = cancelDto.reason;

    return this.orderRepository.save(order);
  }

  // 确认订单
  async confirm(id: number, coachId: number): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id, coachId },
    });

    if (!order) {
      throw new NotFoundException('订单不存在');
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('订单状态不允许确认');
    }

    order.status = OrderStatus.CONFIRMED;
    return this.orderRepository.save(order);
  }

  // 核销订单
  async verify(
    coachId: number,
    verifyDto: VerifyOrderDto,
  ): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { verifyCode: verifyDto.verifyCode, coachId },
    });

    if (!order) {
      throw new NotFoundException('核销码无效');
    }

    if (order.status !== OrderStatus.CONFIRMED) {
      throw new BadRequestException('订单状态不允许核销');
    }

    order.status = OrderStatus.COMPLETED;
    order.verifiedAt = new Date();
    order.completedAt = new Date();

    const savedOrder = await this.orderRepository.save(order);

    // 更新教练学员数
    await this.coachRepository.increment({ id: coachId }, 'studentCount', 1);

    return savedOrder;
  }

  // 获取教练收益统计
  async getIncomeStats(coachId: number) {
    const orders = await this.orderRepository.find({
      where: { coachId, status: OrderStatus.COMPLETED },
    });

    const totalIncome = orders.reduce(
      (sum, order) => sum + Number(order.totalPrice),
      0,
    );

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const monthlyOrders = orders.filter(
      (order) => order.completedAt && order.completedAt >= thisMonth,
    );
    const monthlyIncome = monthlyOrders.reduce(
      (sum, order) => sum + Number(order.totalPrice),
      0,
    );

    return {
      totalIncome,
      monthlyIncome,
      totalOrders: orders.length,
      monthlyOrders: monthlyOrders.length,
    };
  }
}
