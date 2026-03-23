import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Coach } from '../../coach/entities/coach.entity';
import { Course } from '../../course/entities/course.entity';

// 订单状态枚举
export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

// 订单实体
@Entity('orders')
export class Order extends BaseEntity {
  @Column({ name: 'order_no', length: 32, unique: true })
  orderNo: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'coach_id' })
  coachId: number;

  @Column({ name: 'course_id' })
  courseId: number;

  @Column({
    type: 'varchar',
    length: 20,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ name: 'schedule_time', type: 'datetime', nullable: true })
  scheduleTime: Date;

  @Column({ name: 'completed_at', type: 'datetime', nullable: true })
  completedAt: Date;

  @Column({ name: 'verified_at', type: 'datetime', nullable: true })
  verifiedAt: Date;

  @Column({ name: 'verify_code', length: 8, nullable: true })
  verifyCode: string;

  @Column({ type: 'text', nullable: true })
  remark: string;

  @Column({ name: 'cancel_reason', length: 255, nullable: true })
  cancelReason: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Coach)
  @JoinColumn({ name: 'coach_id' })
  coach: Coach;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
