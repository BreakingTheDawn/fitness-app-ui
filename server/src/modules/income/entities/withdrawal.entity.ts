import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { Coach } from '../../coach/entities/coach.entity';

// 提现状态枚举
export enum WithdrawalStatus {
  PENDING = 'pending', // 处理中
  SUCCESS = 'success', // 成功
  FAILED = 'failed', // 失败
}

// 提现记录实体
@Entity('withdrawals')
export class Withdrawal extends BaseEntity {
  @Column({ name: 'coach_id' })
  coachId: number;

  @Column({ name: 'withdrawal_no', length: 32, unique: true })
  withdrawalNo: string; // 提现单号

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number; // 提现金额

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  fee: number; // 手续费

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  actualAmount: number; // 实际到账金额

  @Column({
    type: 'varchar',
    length: 20,
    default: WithdrawalStatus.PENDING,
  })
  status: WithdrawalStatus;

  @Column({ name: 'bank_name', length: 50, nullable: true })
  bankName: string; // 银行名称

  @Column({ name: 'bank_account', length: 30, nullable: true })
  bankAccount: string; // 银行账号

  @Column({ name: 'real_name', length: 50, nullable: true })
  realName: string; // 真实姓名

  @Column({ name: 'processed_at', type: 'datetime', nullable: true })
  processedAt: Date; // 处理时间

  @Column({ name: 'fail_reason', type: 'text', nullable: true })
  failReason: string; // 失败原因

  // 关联关系
  @ManyToOne(() => Coach)
  @JoinColumn({ name: 'coach_id' })
  coach: Coach;
}
