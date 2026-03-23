import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import {
  CreateOrderDto,
  CancelOrderDto,
  VerifyOrderDto,
  QueryOrderDto,
} from './dto';
import { CurrentUser } from '../../common/decorators';

@ApiTags('订单')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // 创建订单
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建订单' })
  async create(
    @CurrentUser('id') userId: number,
    @Body() createDto: CreateOrderDto,
  ) {
    return this.orderService.create(userId, createDto);
  }

  // 获取用户订单列表
  @Get('my')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取我的订单列表' })
  async findByUser(
    @CurrentUser('id') userId: number,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query() query: QueryOrderDto,
  ) {
    return this.orderService.findByUser(
      userId,
      parseInt(page, 10),
      parseInt(limit, 10),
      query,
    );
  }

  // 获取教练订单列表
  @Get('coach')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取教练订单列表' })
  async findByCoach(
    @CurrentUser('coachId') coachId: number,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query() query: QueryOrderDto,
  ) {
    return this.orderService.findByCoach(
      coachId,
      parseInt(page, 10),
      parseInt(limit, 10),
      query,
    );
  }

  // 获取教练收益统计
  @Get('income/stats')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取教练收益统计' })
  async getIncomeStats(@CurrentUser('coachId') coachId: number) {
    return this.orderService.getIncomeStats(coachId);
  }

  // 获取订单详情
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取订单详情' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  // 取消订单
  @Put(':id/cancel')
  @ApiBearerAuth()
  @ApiOperation({ summary: '取消订单' })
  async cancel(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
    @Body() cancelDto: CancelOrderDto,
  ) {
    return this.orderService.cancel(id, userId, cancelDto);
  }

  // 确认订单（教练）
  @Put(':id/confirm')
  @ApiBearerAuth()
  @ApiOperation({ summary: '确认订单（教练）' })
  async confirm(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('coachId') coachId: number,
  ) {
    return this.orderService.confirm(id, coachId);
  }

  // 核销订单
  @Post('verify')
  @ApiBearerAuth()
  @ApiOperation({ summary: '核销订单' })
  async verify(
    @CurrentUser('coachId') coachId: number,
    @Body() verifyDto: VerifyOrderDto,
  ) {
    return this.orderService.verify(coachId, verifyDto);
  }
}
