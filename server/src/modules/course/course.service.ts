import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Coach, CoachStatus } from '../coach/entities/coach.entity';
import { CreateCourseDto, UpdateCourseDto, QueryCourseDto } from './dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
  ) {}

  // 创建课程
  async create(coachId: number, createDto: CreateCourseDto): Promise<Course> {
    // 检查教练是否存在且已认证
    const coach = await this.coachRepository.findOne({
      where: { id: coachId },
    });

    if (!coach || coach.status !== CoachStatus.APPROVED) {
      throw new BadRequestException('教练不存在或未通过认证');
    }

    const course = this.courseRepository.create({
      coachId,
      ...createDto,
    });

    return this.courseRepository.save(course);
  }

  // 获取课程详情
  async findOne(id: number): Promise<Course | null> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['coach', 'coach.user'],
    });

    if (!course) {
      throw new NotFoundException('课程不存在');
    }

    return course;
  }

  // 获取课程列表
  async findAll(
    page: number = 1,
    limit: number = 10,
    query?: QueryCourseDto,
  ): Promise<[Course[], number]> {
    const queryBuilder = this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.coach', 'coach')
      .where('course.isActive = :isActive', { isActive: true });

    // 教练筛选
    if (query?.coachId) {
      queryBuilder.andWhere('course.coachId = :coachId', {
        coachId: query.coachId,
      });
    }

    // 类型筛选
    if (query?.type) {
      queryBuilder.andWhere('course.type = :type', { type: query.type });
    }

    // 价格区间筛选
    if (query?.minPrice !== undefined) {
      queryBuilder.andWhere('course.price >= :minPrice', {
        minPrice: query.minPrice,
      });
    }
    if (query?.maxPrice !== undefined) {
      queryBuilder.andWhere('course.price <= :maxPrice', {
        maxPrice: query.maxPrice,
      });
    }

    // 关键词搜索
    if (query?.keyword) {
      queryBuilder.andWhere(
        '(course.title LIKE :keyword OR course.description LIKE :keyword)',
        { keyword: `%${query.keyword}%` },
      );
    }

    // 排序和分页
    queryBuilder
      .orderBy('course.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    return queryBuilder.getManyAndCount();
  }

  // 更新课程
  async update(
    id: number,
    coachId: number,
    updateDto: UpdateCourseDto,
  ): Promise<Course | null> {
    const course = await this.courseRepository.findOne({
      where: { id, coachId },
    });

    if (!course) {
      throw new NotFoundException('课程不存在或无权修改');
    }

    Object.assign(course, updateDto);
    return this.courseRepository.save(course);
  }

  // 删除课程（软删除，设置为不活跃）
  async remove(id: number, coachId: number): Promise<void> {
    const course = await this.courseRepository.findOne({
      where: { id, coachId },
    });

    if (!course) {
      throw new NotFoundException('课程不存在或无权删除');
    }

    course.isActive = false;
    await this.courseRepository.save(course);
  }

  // 获取教练的课程列表
  async findByCoach(coachId: number): Promise<Course[]> {
    return this.courseRepository.find({
      where: { coachId },
      order: { createdAt: 'DESC' },
    });
  }
}
