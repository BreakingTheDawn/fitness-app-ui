import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  MaxLength,
  Min,
} from 'class-validator';

// 教练申请DTO
export class ApplyCoachDto {
  @IsString()
  @MaxLength(50, { message: '姓名最多50个字符' })
  name: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsArray()
  @IsOptional()
  certifications?: string[];

  @IsArray()
  @IsOptional()
  specialties?: string[];

  @IsString()
  @IsOptional()
  gymName?: string;

  @IsString()
  @IsOptional()
  gymAddress?: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsNumber()
  @Min(0, { message: '价格不能为负数' })
  @IsOptional()
  price?: number;
}

// 更新教练信息DTO
export class UpdateCoachDto {
  @IsString()
  @IsOptional()
  @MaxLength(50, { message: '姓名最多50个字符' })
  name?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsArray()
  @IsOptional()
  certifications?: string[];

  @IsArray()
  @IsOptional()
  specialties?: string[];

  @IsString()
  @IsOptional()
  gymName?: string;

  @IsString()
  @IsOptional()
  gymAddress?: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsNumber()
  @Min(0, { message: '价格不能为负数' })
  @IsOptional()
  price?: number;
}

// 教练查询DTO
export class QueryCoachDto {
  @IsString()
  @IsOptional()
  keyword?: string;

  @IsString()
  @IsOptional()
  specialty?: string;

  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  maxPrice?: number;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsNumber()
  @IsOptional()
  distance?: number;

  @IsString()
  @IsOptional()
  sortBy?: 'rating' | 'price' | 'distance' | 'studentCount';

  @IsString()
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC';
}
