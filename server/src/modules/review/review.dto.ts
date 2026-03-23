import {
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  Min,
  Max,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// 创建评价DTO
export class CreateReviewDto {
  @ApiProperty({ description: '订单ID' })
  @IsNumber()
  orderId: number;

  @ApiProperty({ description: '教练ID' })
  @IsNumber()
  coachId: number;

  @ApiProperty({ description: '评分 1-5', minimum: 1, maximum: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({ description: '评价内容', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  content?: string;

  @ApiPropertyOptional({ description: '评价图片URL列表' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiPropertyOptional({ description: '是否匿名', default: false })
  @IsOptional()
  @IsBoolean()
  isAnonymous?: boolean;
}

// 教练回复DTO
export class ReplyReviewDto {
  @ApiProperty({ description: '回复内容', maxLength: 300 })
  @IsString()
  @MaxLength(300)
  reply: string;
}

// 查询评价DTO
export class QueryReviewDto {
  @ApiPropertyOptional({ description: '页码', default: 1 })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ description: '每页数量', default: 10 })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({ description: '评分筛选 1-5' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;
}
