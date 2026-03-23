import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../user/entities/user.entity';
import { UpdateUserDto, SwitchRoleDto } from './dto';
import { Coach, CoachStatus } from '../coach/entities/coach.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
  ) {}

  // 获取当前用户信息
  async getProfile(userId: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id: userId });
  }

  // 更新用户信息
  async updateProfile(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    // 更新用户信息
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  // 切换用户角色
  async switchRole(
    userId: number,
    switchRoleDto: SwitchRoleDto,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 如果切换到教练角色
    if (switchRoleDto.role === UserRole.COACH) {
      // 检查是否已有教练资料
      const existingCoach = await this.coachRepository.findOne({
        where: { userId },
      });
      if (!existingCoach) {
        // 创建教练资料
        const coach = this.coachRepository.create({
          userId,
          status: CoachStatus.PENDING,
          specialties: [],
        });
        await this.coachRepository.save(coach);
        // 更新用户角色
        user.role = UserRole.COACH;
        user.coachId = coach.id;
      }
    } else if (switchRoleDto.role === UserRole.USER) {
      // 切换回普通用户
      user.role = UserRole.USER;
      user.coachId = null;
    }
    return this.userRepository.save(user);
  }

  // 获取用户列表
  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<[User[], number]> {
    return this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' as const },
    });
  }
}
