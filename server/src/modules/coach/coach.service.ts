import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coach, CoachStatus } from './entities/coach.entity';
import { User, UserRole } from '../user/entities/user.entity';
import { ApplyCoachDto, UpdateCoachDto, QueryCoachDto } from './dto';

@Injectable()
export class CoachService {
  constructor(
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 申请成为教练
  async apply(userId: number, applyDto: ApplyCoachDto): Promise<Coach> {
    // 检查用户是否存在
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 检查是否已经是教练
    const existingCoach = await this.coachRepository.findOne({
      where: { userId },
    });

    if (existingCoach) {
      throw new BadRequestException('您已申请过教练，请等待审核');
    }

    // 创建教练申请
    const coach = this.coachRepository.create({
      userId,
      ...applyDto,
      status: CoachStatus.PENDING,
    });

    const savedCoach = await this.coachRepository.save(coach);

    // 更新用户角色
    user.role = UserRole.COACH;
    user.coachId = savedCoach.id;
    await this.userRepository.save(user);

    return savedCoach;
  }

  // 获取教练详情
  async findOne(id: number): Promise<Coach> {
    const coach = await this.coachRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!coach) {
      throw new NotFoundException('教练不存在');
    }

    return coach;
  }

  // 获取教练列表
  async findAll(
    page: number = 1,
    limit: number = 10,
    query?: QueryCoachDto,
  ): Promise<[Coach[], number]> {
    const queryBuilder = this.coachRepository
      .createQueryBuilder('coach')
      .where('coach.status = :status', { status: CoachStatus.APPROVED });

    // 关键词搜索
    if (query?.keyword) {
      queryBuilder.andWhere(
        '(coach.name LIKE :keyword OR coach.bio LIKE :keyword)',
        { keyword: `%${query.keyword}%` },
      );
    }

    // 专业领域筛选
    if (query?.specialty) {
      queryBuilder.andWhere('coach.specialties LIKE :specialty', {
        specialty: `%"${query.specialty}"%`,
      });
    }

    // 价格区间筛选
    if (query?.minPrice !== undefined) {
      queryBuilder.andWhere('coach.price >= :minPrice', {
        minPrice: query.minPrice,
      });
    }
    if (query?.maxPrice !== undefined) {
      queryBuilder.andWhere('coach.price <= :maxPrice', {
        maxPrice: query.maxPrice,
      });
    }

    // 排序
    const sortBy = query?.sortBy || 'rating';
    const sortOrder = query?.sortOrder || 'DESC';
    queryBuilder.orderBy(`coach.${sortBy}`, sortOrder);

    // 分页
    queryBuilder.skip((page - 1) * limit).take(limit);

    return queryBuilder.getManyAndCount();
  }

  // 更新教练信息
  async update(userId: number, updateDto: UpdateCoachDto): Promise<Coach> {
    const coach = await this.coachRepository.findOne({
      where: { userId },
    });

    if (!coach) {
      throw new NotFoundException('教练信息不存在');
    }

    Object.assign(coach, updateDto);
    return this.coachRepository.save(coach);
  }

  // 获取附近教练
  async findNearby(
    latitude: number,
    longitude: number,
    distance: number = 10,
    limit: number = 20,
  ): Promise<(Coach & { distance: number })[]> {
    // 简单的距离计算（使用勾股定理近似）
    const coaches = await this.coachRepository
      .createQueryBuilder('coach')
      .where('coach.status = :status', { status: CoachStatus.APPROVED })
      .andWhere('coach.latitude IS NOT NULL')
      .andWhere('coach.longitude IS NOT NULL')
      .getMany();

    // 计算距离并排序
    const coachesWithDistance = coaches.map((coach) => {
      const dist = this.calculateDistance(
        latitude,
        longitude,
        coach.latitude,
        coach.longitude,
      );
      return { ...coach, distance: dist };
    });

    // 过滤距离并排序
    return coachesWithDistance
      .filter((c) => c.distance <= distance)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);
  }

  // 计算两点之间的距离（公里）
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // 地球半径（公里）
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // 获取教练统计数据
  async getStats(coachId: number) {
    const coach = await this.coachRepository.findOneBy({ id: coachId });

    if (!coach) {
      throw new NotFoundException('教练不存在');
    }

    return {
      rating: coach.rating,
      reviewCount: coach.reviewCount,
      studentCount: coach.studentCount,
    };
  }
}
