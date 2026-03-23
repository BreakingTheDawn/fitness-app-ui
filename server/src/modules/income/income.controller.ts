import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators';
import { IncomeService } from './income.service';
import { WithdrawDto, QueryIncomeDto, QueryWithdrawalDto } from './income.dto';

@ApiTags('收益管理')
@ApiBearerAuth()
@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  // 获取收益统计
  @Get('stats')
  @ApiOperation({ summary: '获取收益统计（教练端）' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getStats(@CurrentUser('coachId') coachId: number) {
    return this.incomeService.getStats(coachId);
  }

  // 获取收益记录列表
  @Get('records')
  @ApiOperation({ summary: '获取收益记录列表（教练端）' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getRecords(
    @CurrentUser('coachId') coachId: number,
    @Query() query: QueryIncomeDto,
  ) {
    const [records, total] = await this.incomeService.getRecords(
      coachId,
      query,
    );
    return {
      list: records,
      total,
      page: query.page || 1,
      limit: query.limit || 10,
    };
  }

  // 申请提现
  @Post('withdraw')
  @ApiOperation({ summary: '申请提现（教练端）' })
  @ApiResponse({ status: 201, description: '申请成功' })
  @ApiResponse({ status: 400, description: '余额不足或金额不满足要求' })
  async withdraw(
    @CurrentUser('coachId') coachId: number,
    @Body() withdrawDto: WithdrawDto,
  ) {
    return this.incomeService.withdraw(coachId, withdrawDto);
  }

  // 获取提现记录列表
  @Get('withdrawals')
  @ApiOperation({ summary: '获取提现记录列表（教练端）' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getWithdrawals(
    @CurrentUser('coachId') coachId: number,
    @Query() query: QueryWithdrawalDto,
  ) {
    const [withdrawals, total] = await this.incomeService.getWithdrawals(
      coachId,
      query,
    );
    return {
      list: withdrawals,
      total,
      page: query.page || 1,
      limit: query.limit || 10,
    };
  }

  // 获取提现详情
  @Get('withdrawals/:id')
  @ApiOperation({ summary: '获取提现详情（教练端）' })
  @ApiParam({ name: 'id', description: '提现记录ID' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 404, description: '提现记录不存在' })
  async getWithdrawalDetail(
    @CurrentUser('coachId') coachId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.incomeService.getWithdrawalDetail(coachId, id);
  }
}
