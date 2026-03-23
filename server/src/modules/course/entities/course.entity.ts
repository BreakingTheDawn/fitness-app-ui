import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { Coach } from '../../coach/entities/coach.entity';

// 课程类型枚举
export enum CourseType {
  EXPERIENCE = 'experience',
  PRIVATE = 'private',
  GROUP = 'group',
}

// 课程实体
@Entity('courses')
export class Course extends BaseEntity {
  @Column({ name: 'coach_id' })
  coachId: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: CourseType.EXPERIENCE,
  })
  type: CourseType;

  @Column({ default: 60 })
  duration: number;

  @Column({ default: 1 })
  sessions: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    name: 'original_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  originalPrice: number;

  @Column({ type: 'simple-json', nullable: true })
  images: string[];

  @Column({ type: 'simple-json', nullable: true })
  tags: string[];

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'max_capacity', default: 1 })
  maxCapacity: number;

  @Column({ name: 'current_enrolled', default: 0 })
  currentEnrolled: number;

  @ManyToOne(() => Coach, (coach) => coach.courses)
  @JoinColumn({ name: 'coach_id' })
  coach: Coach;
}
