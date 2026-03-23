import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Course } from '../../course/entities/course.entity';

// 教练状态枚举
export enum CoachStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

// 教练实体
@Entity('coaches')
export class Coach extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'simple-json', nullable: true })
  certifications: string[];

  @Column({ type: 'simple-json', nullable: true })
  specialties: string[];

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ name: 'review_count', default: 0 })
  reviewCount: number;

  @Column({ name: 'student_count', default: 0 })
  studentCount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 88 })
  price: number;

  @Column({ name: 'gym_name', length: 100, nullable: true })
  gymName: string;

  @Column({ name: 'gym_address', length: 255, nullable: true })
  gymAddress: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitude: number;

  @Column({
    type: 'varchar',
    length: 20,
    default: CoachStatus.PENDING,
  })
  status: CoachStatus;

  @Column({ name: 'cover_image', length: 255, nullable: true })
  coverImage: string;

  @Column({ type: 'simple-json', nullable: true })
  images: string[];

  @Column({ name: 'working_hours', type: 'simple-json', nullable: true })
  workingHours: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Course, (course) => course.coach)
  courses: Course[];
}
