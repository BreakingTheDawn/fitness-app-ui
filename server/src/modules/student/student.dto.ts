import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsDateString,
  IsArray,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudentStatus } from './entities/student.entity';

// 查询学员DTO
export class QueryStudentDto {
  @ApiPropertyOptional({ description: '学员状态', enum: StudentStatus })
  @IsOptional()
  @IsEnum(StudentStatus)
  status?: StudentStatus;

  @ApiPropertyOptional({ description: '关键词搜索(姓名/手机号)' })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({ description: '页码', default: 1 })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ description: '每页数量', default: 10 })
  @IsOptional()
  @IsNumber()
  limit?: number;
}

// 更新学员DTO
export class UpdateStudentDto {
  @ApiPropertyOptional({ description: '学员状态', enum: StudentStatus })
  @IsOptional()
  @IsEnum(StudentStatus)
  status?: StudentStatus;

  @ApiPropertyOptional({ description: '主要目标', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  primaryGoal?: string;

  @ApiPropertyOptional({ description: '教练备注' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ description: '总课时' })
  @IsOptional()
  @IsNumber()
  totalSessions?: number;

  @ApiPropertyOptional({ description: '已用课时' })
  @IsOptional()
  @IsNumber()
  usedSessions?: number;

  @ApiPropertyOptional({ description: '下次提醒时间' })
  @IsOptional()
  @IsDateString()
  nextRemindAt?: string;
}

// 创建训练档案DTO
export class CreateTrainingRecordDto {
  @ApiProperty({ description: '训练日期 (YYYY-MM-DD)' })
  @IsDateString()
  trainingDate: string;

  @ApiProperty({ description: '训练标题', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiPropertyOptional({ description: '训练内容描述' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: '训练动作列表' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  exercises?: string[];

  @ApiPropertyOptional({ description: '训练时长(分钟)', default: 60 })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiPropertyOptional({ description: '教练点评' })
  @IsOptional()
  @IsString()
  coachNotes?: string;

  @ApiPropertyOptional({ description: '关联订单ID' })
  @IsOptional()
  @IsNumber()
  orderId?: number;
}

// 创建身体数据DTO
export class CreateBodyDataDto {
  @ApiProperty({ description: '记录日期 (YYYY-MM-DD)' })
  @IsDateString()
  recordDate: string;

  @ApiPropertyOptional({ description: '体重(kg)' })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiPropertyOptional({ description: '体脂率(%)' })
  @IsOptional()
  @IsNumber()
  bodyFat?: number;

  @ApiPropertyOptional({ description: '肌肉量(kg)' })
  @IsOptional()
  @IsNumber()
  muscleMass?: number;

  @ApiPropertyOptional({ description: '胸围(cm)' })
  @IsOptional()
  @IsNumber()
  chestCircumference?: number;

  @ApiPropertyOptional({ description: '腰围(cm)' })
  @IsOptional()
  @IsNumber()
  waistCircumference?: number;

  @ApiPropertyOptional({ description: '臀围(cm)' })
  @IsOptional()
  @IsNumber()
  hipCircumference?: number;

  @ApiPropertyOptional({ description: '身体照片URL列表(JSON数组字符串)' })
  @IsOptional()
  @IsString()
  photos?: string;
}
