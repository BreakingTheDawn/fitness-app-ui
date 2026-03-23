import {
  IsNumber,
  IsOptional,
  IsDateString,
  IsString,
  MaxLength,
} from 'class-validator';

// 创建订单DTO
export class CreateOrderDto {
  @IsNumber()
  coachId: number;

  @IsNumber()
  courseId: number;

  @IsDateString()
  @IsOptional()
  scheduleTime?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, { message: '备注最多500个字符' })
  remark?: string;
}

// 取消订单DTO
export class CancelOrderDto {
  @IsString()
  @MaxLength(255, { message: '取消原因最多255个字符' })
  reason: string;
}

// 核销订单DTO
export class VerifyOrderDto {
  @IsString()
  verifyCode: string;
}

// 订单查询DTO
export class QueryOrderDto {
  @IsString()
  @IsOptional()
  status?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;
}
