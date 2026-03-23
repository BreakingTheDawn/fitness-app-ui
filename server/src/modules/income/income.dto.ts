import {
  IsNumber,
  IsString,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// 申请提现DTO
export class WithdrawDto {
  @ApiProperty({ description: '提现金额', minimum: 1 })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({ description: '银行名称', maxLength: 50 })
  @IsString()
  @MaxLength(50)
  bankName: string;

  @ApiProperty({ description: '银行账号', maxLength: 30 })
  @IsString()
  @MaxLength(30)
  bankAccount: string;

  @ApiProperty({ description: '真实姓名', maxLength: 50 })
  @IsString()
  @MaxLength(50)
  realName: string;
}

// 收益记录查询DTO
export class QueryIncomeDto {
  @ApiPropertyOptional({ description: '页码', default: 1 })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ description: '每页数量', default: 10 })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({ description: '开始日期 (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({ description: '结束日期 (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  endDate?: string;
}

// 提现记录查询DTO
export class QueryWithdrawalDto {
  @ApiPropertyOptional({ description: '页码', default: 1 })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ description: '每页数量', default: 10 })
  @IsOptional()
  @IsNumber()
  limit?: number;
}
