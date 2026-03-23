import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { Student } from './student.entity';

// 身体数据实体 - 记录学员身体数据变化
@Entity('body_data')
export class BodyData extends BaseEntity {
  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'record_date', type: 'date' })
  recordDate: Date; // 记录日期

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight: number; // 体重(kg)

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  bodyFat: number; // 体脂率(%)

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  muscleMass: number; // 肌肉量(kg)

  @Column({
    name: 'chest_circumference',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  chestCircumference: number; // 胸围(cm)

  @Column({
    name: 'waist_circumference',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  waistCircumference: number; // 腰围(cm)

  @Column({
    name: 'hip_circumference',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  hipCircumference: number; // 臀围(cm)

  @Column({ type: 'text', nullable: true })
  photos: string; // 身体照片(JSON数组)

  // 关联关系
  @ManyToOne(() => Student, (student) => student.bodyData)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}
