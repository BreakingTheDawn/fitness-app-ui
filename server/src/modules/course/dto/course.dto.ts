import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsArray,
  Min,
  MaxLength,
} from 'class-validator';
import { CourseType } from '../entities/course.entity';

// 创建课程DTO
export class CreateCourseDto {
  @IsString()
  @MaxLength(100, { message: '标题最多100个字符' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(CourseType, { message: '课程类型无效' })
  @IsOptional()
  type?: CourseType;

  @IsNumber()
  @Min(1, { message: '时长至少1分钟' })
  @IsOptional()
  duration?: number;

  @IsNumber()
  @Min(1, { message: '课时数至少1' })
  @IsOptional()
  sessions?: number;

  @IsNumber()
  @Min(0, { message: '价格不能为负数' })
  price: number;

  @IsNumber()
  @Min(0, { message: '原价不能为负数' })
  @IsOptional()
  originalPrice?: number;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsNumber()
  @Min(1, { message: '容量至少1' })
  @IsOptional()
  maxCapacity?: number;
}

// 更新课程DTO
export class UpdateCourseDto {
  @IsString()
  @IsOptional()
  @MaxLength(100, { message: '标题最多100个字符' })
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0, { message: '价格不能为负数' })
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0, { message: '原价不能为负数' })
  @IsOptional()
  originalPrice?: number;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

// 课程查询DTO
export class QueryCourseDto {
  @IsNumber()
  @IsOptional()
  coachId?: number;

  @IsEnum(CourseType)
  @IsOptional()
  type?: CourseType;

  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  maxPrice?: number;

  @IsString()
  @IsOptional()
  keyword?: string;
}
