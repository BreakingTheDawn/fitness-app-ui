import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { Coach } from '../../coach/entities/coach.entity';

// 收益类型枚举
export enum IncomeType {
  COURSE = 'course', // 课程收入
  REFUND = 'refund', // 退款扣除
  COMMISSION = 'commission', // 平台佣金
}

// 收益记录实体
@Entity('income_records')
export class IncomeRecord extends BaseEntity {
  @Column({ name: 'coach_id' })
  coachId: number;

  @Column({ name: 'order_id', nullable: true })
  orderId: number; // 关联订单

  @Column({
    type: 'varchar',
    length: 20,
  })
  type: IncomeType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number; // 金额

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  commission: number; // 佣金

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  netAmount: number; // 净收入

  @Column({ name: 'settle_date', type: 'date', nullable: true })
  settleDate: Date; // 结算日期(T+7)

  @Column({ name: 'is_settled', default: false })
  isSettled: boolean; // 是否已结算

  @Column({ length: 100, nullable: true })
  description: string; // 描述

  // 关联关系
  @ManyToOne(() => Coach)
  @JoinColumn({ name: 'coach_id' })
  coach: Coach;
}
