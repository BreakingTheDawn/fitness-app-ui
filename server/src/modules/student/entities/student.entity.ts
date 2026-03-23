import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Coach } from '../../coach/entities/coach.entity';
import { TrainingRecord } from './training-record.entity';
import { BodyData } from './body-data.entity';

// 学员状态枚举
export enum StudentStatus {
  ACTIVE = 'active', // 上课中
  FOLLOW_UP = 'follow_up', // 待跟进
  COMPLETED = 'completed', // 已结课
}

// 学员实体 - 教练端学员管理
@Entity('students')
export class Student extends BaseEntity {
  @Column({ name: 'coach_id' })
  coachId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({
    type: 'varchar',
    length: 20,
    default: StudentStatus.ACTIVE,
  })
  status: StudentStatus;

  @Column({ name: 'total_sessions', default: 0 })
  totalSessions: number; // 总课时

  @Column({ name: 'used_sessions', default: 0 })
  usedSessions: number; // 已用课时

  @Column({ name: 'primary_goal', length: 50, nullable: true })
  primaryGoal: string; // 主要目标（减脂、增肌等）

  @Column({ name: 'last_class_at', type: 'datetime', nullable: true })
  lastClassAt: Date; // 最近上课时间

  @Column({ name: 'next_remind_at', type: 'datetime', nullable: true })
  nextRemindAt: Date; // 下次提醒时间

  @Column({ type: 'text', nullable: true })
  notes: string; // 教练备注

  // 关联关系
  @ManyToOne(() => Coach)
  @JoinColumn({ name: 'coach_id' })
  coach: Coach;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => TrainingRecord, (record) => record.student)
  trainingRecords: TrainingRecord[];

  @OneToMany(() => BodyData, (data) => data.student)
  bodyData: BodyData[];
}
