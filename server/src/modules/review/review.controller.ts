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
import { CurrentUser, Public } from '../../common/decorators';
import { ReviewService } from './review.service';
import { CreateReviewDto, ReplyReviewDto, QueryReviewDto } from './review.dto';

@ApiTags('评价管理')
@ApiBearerAuth()
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // 创建评价
  @Post()
  @ApiOperation({ summary: '创建评价（用户端）' })
  @ApiResponse({ status: 201, description: '创建成功' })
  @ApiResponse({ status: 400, description: '订单未完成或已评价' })
  async create(
    @CurrentUser('userId') userId: number,
    @Body() createDto: CreateReviewDto,
  ) {
    return this.reviewService.create(userId, createDto);
  }

  // 获取教练评价列表（公开）
  @Get('coach/:coachId')
  @Public()
  @ApiOperation({ summary: '获取教练评价列表' })
  @ApiParam({ name: 'coachId', description: '教练ID' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findByCoach(
    @Param('coachId', ParseIntPipe) coachId: number,
    @Query() query: QueryReviewDto,
  ) {
    const [reviews, total] = await this.reviewService.findByCoach(
      coachId,
      query,
    );
    return {
      list: reviews,
      total,
      page: query.page || 1,
      limit: query.limit || 10,
    };
  }

  // 获取教练评价统计（公开）
  @Get('coach/:coachId/stats')
  @Public()
  @ApiOperation({ summary: '获取教练评价统计' })
  @ApiParam({ name: 'coachId', description: '教练ID' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getCoachReviewStats(@Param('coachId', ParseIntPipe) coachId: number) {
    return this.reviewService.getCoachReviewStats(coachId);
  }

  // 获取我的评价列表
  @Get('my')
  @ApiOperation({ summary: '获取我的评价列表（用户端）' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findByUser(
    @CurrentUser('userId') userId: number,
    @Query() query: QueryReviewDto,
  ) {
    const [reviews, total] = await this.reviewService.findByUser(userId, query);
    return {
      list: reviews,
      total,
      page: query.page || 1,
      limit: query.limit || 10,
    };
  }

  // 教练回复评价
  @Post(':id/reply')
  @ApiOperation({ summary: '教练回复评价（教练端）' })
  @ApiParam({ name: 'id', description: '评价ID' })
  @ApiResponse({ status: 200, description: '回复成功' })
  @ApiResponse({ status: 400, description: '已回复' })
  async reply(
    @CurrentUser('coachId') coachId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() replyDto: ReplyReviewDto,
  ) {
    return this.reviewService.reply(coachId, id, replyDto);
  }

  // 获取评价详情
  @Get(':id')
  @Public()
  @ApiOperation({ summary: '获取评价详情' })
  @ApiParam({ name: 'id', description: '评价ID' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 404, description: '评价不存在' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.findOne(id);
  }
}
