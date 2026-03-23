import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Coach } from '../../coach/entities/coach.entity';
import { Order } from '../../order/entities/order.entity';

// 评价实体 - 用户对教练的评价
@Entity('reviews')
export class Review extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'coach_id' })
  coachId: number;

  @Column({ name: 'order_id' })
  orderId: number;

  @Column({ type: 'tinyint' })
  rating: number; // 评分 1-5

  @Column({ type: 'text', nullable: true })
  content: string; // 评价内容

  @Column({ type: 'simple-json', nullable: true })
  images: string[]; // 评价图片

  @Column({ name: 'is_anonymous', default: false })
  isAnonymous: boolean; // 是否匿名

  @Column({ name: 'coach_reply', type: 'text', nullable: true })
  coachReply: string; // 教练回复

  @Column({ name: 'replied_at', type: 'datetime', nullable: true })
  repliedAt: Date; // 回复时间

  // 关联关系
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Coach)
  @JoinColumn({ name: 'coach_id' })
  coach: Coach;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
