import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { Student } from './student.entity';

// 训练档案实体 - 记录学员每次训练内容
@Entity('training_records')
export class TrainingRecord extends BaseEntity {
  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'order_id', nullable: true })
  orderId: number; // 关联订单

  @Column({ name: 'training_date', type: 'date' })
  trainingDate: Date; // 训练日期

  @Column({ length: 100 })
  title: string; // 训练标题

  @Column({ type: 'text', nullable: true })
  content: string; // 训练内容描述

  @Column({ type: 'simple-json', nullable: true })
  exercises: string[]; // 训练动作列表

  @Column({ name: 'duration', default: 60 })
  duration: number; // 训练时长（分钟）

  @Column({ type: 'text', nullable: true })
  coachNotes: string; // 教练点评

  // 关联关系
  @ManyToOne(() => Student, (student) => student.trainingRecords)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}
