import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';

// 用户角色枚举
export enum UserRole {
  USER = 'user',
  COACH = 'coach',
}

// 用户实体 - 支持C端用户和B端教练
@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  openid: string;

  @Column({ length: 50 })
  nickname: string;

  @Column({ length: 255, nullable: true })
  avatar: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ name: 'coach_id', nullable: true })
  coachId: number | null;

  @Column({ name: 'is_coach_verified', default: false })
  isCoachVerified: boolean;

  @Column({ name: 'member_level', default: 0 })
  memberLevel: number;

  @Column({ name: 'member_expire_at', type: 'datetime', nullable: true })
  memberExpireAt: Date;

  @Column({ type: 'text', nullable: true })
  preferences: string;
}
