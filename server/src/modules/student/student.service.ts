import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student, StudentStatus } from './entities/student.entity';
import { TrainingRecord } from './entities/training-record.entity';
import { BodyData } from './entities/body-data.entity';
import { Coach, CoachStatus } from '../coach/entities/coach.entity';
import { User } from '../user/entities/user.entity';
import {
  QueryStudentDto,
  UpdateStudentDto,
  CreateTrainingRecordDto,
  CreateBodyDataDto,
} from './student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(TrainingRecord)
    private trainingRecordRepository: Repository<TrainingRecord>,
    @InjectRepository(BodyData)
    private bodyDataRepository: Repository<BodyData>,
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 获取学员列表
  async findAll(
    coachId: number,
    query?: QueryStudentDto,
  ): Promise<[Student[], number]> {
    const page = query?.page || 1;
    const limit = query?.limit || 10;

    const queryBuilder = this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.user', 'user')
      .where('student.coachId = :coachId', { coachId });

    // 状态筛选
    if (query?.status) {
      queryBuilder.andWhere('student.status = :status', {
        status: query.status,
      });
    }

    // 关键词搜索
    if (query?.keyword) {
      queryBuilder.andWhere(
        '(user.nickname LIKE :keyword OR user.phone LIKE :keyword)',
        { keyword: `%${query.keyword}%` },
      );
    }

    // 排序：最近上课时间倒序
    queryBuilder
      .orderBy('student.lastClassAt', 'DESC', 'NULLS LAST')
      .addOrderBy('student.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    return queryBuilder.getManyAndCount();
  }

  // 获取学员详情
  async findOne(coachId: number, studentId: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: studentId, coachId },
      relations: ['user', 'trainingRecords', 'bodyData'],
    });

    if (!student) {
      throw new NotFoundException('学员不存在');
    }

    return student;
  }

  // 创建或获取学员（当用户下单时调用）
  async createOrGet(coachId: number, userId: number): Promise<Student> {
    // 检查教练是否存在
    const coach = await this.coachRepository.findOne({
      where: { id: coachId, status: CoachStatus.APPROVED },
    });

    if (!coach) {
      throw new NotFoundException('教练不存在');
    }

    // 检查用户是否存在
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 查找是否已有学员记录
    let student = await this.studentRepository.findOne({
      where: { coachId, userId },
    });

    if (!student) {
      // 创建新学员
      student = this.studentRepository.create({
        coachId,
        userId,
        status: StudentStatus.ACTIVE,
        totalSessions: 0,
        usedSessions: 0,
      });
      student = await this.studentRepository.save(student);
    }

    return student;
  }

  // 更新学员信息
  async update(
    coachId: number,
    studentId: number,
    updateDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: studentId, coachId },
    });

    if (!student) {
      throw new NotFoundException('学员不存在');
    }

    // 更新字段
    if (updateDto.status !== undefined) {
      student.status = updateDto.status;
    }
    if (updateDto.primaryGoal !== undefined) {
      student.primaryGoal = updateDto.primaryGoal;
    }
    if (updateDto.notes !== undefined) {
      student.notes = updateDto.notes;
    }
    if (updateDto.totalSessions !== undefined) {
      student.totalSessions = updateDto.totalSessions;
    }
    if (updateDto.usedSessions !== undefined) {
      student.usedSessions = updateDto.usedSessions;
    }
    if (updateDto.nextRemindAt !== undefined) {
      student.nextRemindAt = new Date(updateDto.nextRemindAt);
    }

    return this.studentRepository.save(student);
  }

  // 更新学员上课时间
  async updateLastClassTime(studentId: number): Promise<void> {
    await this.studentRepository.update(studentId, {
      lastClassAt: new Date(),
    });
  }

  // 增加已用课时
  async incrementUsedSessions(studentId: number): Promise<void> {
    await this.studentRepository.increment(
      { id: studentId },
      'usedSessions',
      1,
    );
  }

  // 获取学员统计信息
  async getStats(coachId: number) {
    const [active, followUp, completed] = await Promise.all([
      this.studentRepository.count({
        where: { coachId, status: StudentStatus.ACTIVE },
      }),
      this.studentRepository.count({
        where: { coachId, status: StudentStatus.FOLLOW_UP },
      }),
      this.studentRepository.count({
        where: { coachId, status: StudentStatus.COMPLETED },
      }),
    ]);

    return {
      active,
      followUp,
      completed,
      total: active + followUp + completed,
    };
  }

  // ========== 训练档案相关 ==========

  // 获取训练档案列表
  async getTrainingRecords(
    coachId: number,
    studentId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<[TrainingRecord[], number]> {
    // 验证学员归属
    const student = await this.studentRepository.findOne({
      where: { id: studentId, coachId },
    });

    if (!student) {
      throw new NotFoundException('学员不存在');
    }

    return this.trainingRecordRepository.findAndCount({
      where: { studentId },
      order: { trainingDate: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  // 创建训练档案
  async createTrainingRecord(
    coachId: number,
    studentId: number,
    createDto: CreateTrainingRecordDto,
  ): Promise<TrainingRecord> {
    // 验证学员归属
    const student = await this.studentRepository.findOne({
      where: { id: studentId, coachId },
    });

    if (!student) {
      throw new NotFoundException('学员不存在');
    }

    const record = this.trainingRecordRepository.create({
      studentId,
      trainingDate: new Date(createDto.trainingDate),
      title: createDto.title,
      content: createDto.content,
      exercises: createDto.exercises,
      duration: createDto.duration || 60,
      coachNotes: createDto.coachNotes,
      orderId: createDto.orderId,
    });

    return this.trainingRecordRepository.save(record);
  }

  // ========== 身体数据相关 ==========

  // 获取身体数据历史
  async getBodyDataHistory(
    coachId: number,
    studentId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<[BodyData[], number]> {
    // 验证学员归属
    const student = await this.studentRepository.findOne({
      where: { id: studentId, coachId },
    });

    if (!student) {
      throw new NotFoundException('学员不存在');
    }

    return this.bodyDataRepository.findAndCount({
      where: { studentId },
      order: { recordDate: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  // 记录身体数据
  async createBodyData(
    coachId: number,
    studentId: number,
    createDto: CreateBodyDataDto,
  ): Promise<BodyData> {
    // 验证学员归属
    const student = await this.studentRepository.findOne({
      where: { id: studentId, coachId },
    });

    if (!student) {
      throw new NotFoundException('学员不存在');
    }

    const bodyData = this.bodyDataRepository.create({
      studentId,
      recordDate: new Date(createDto.recordDate),
      weight: createDto.weight,
      bodyFat: createDto.bodyFat,
      muscleMass: createDto.muscleMass,
      chestCircumference: createDto.chestCircumference,
      waistCircumference: createDto.waistCircumference,
      hipCircumference: createDto.hipCircumference,
      photos: createDto.photos,
    });

    return this.bodyDataRepository.save(bodyData);
  }
}
