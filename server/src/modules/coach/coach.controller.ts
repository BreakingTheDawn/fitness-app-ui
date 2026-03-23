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
import { CoachService } from './coach.service';
import { ApplyCoachDto, UpdateCoachDto, QueryCoachDto } from './dto';
import { CurrentUser, Public } from '../../common/decorators';

@ApiTags('教练')
@Controller('coach')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  // 申请成为教练
  @Post('apply')
  @ApiBearerAuth()
  @ApiOperation({ summary: '申请成为教练' })
  async apply(
    @CurrentUser('id') userId: number,
    @Body() applyDto: ApplyCoachDto,
  ) {
    return this.coachService.apply(userId, applyDto);
  }

  // 获取教练列表
  @Public()
  @Get('list')
  @ApiOperation({ summary: '获取教练列表' })
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query() query: QueryCoachDto,
  ) {
    return this.coachService.findAll(
      parseInt(page, 10),
      parseInt(limit, 10),
      query,
    );
  }

  // 获取附近教练
  @Public()
  @Get('nearby')
  @ApiOperation({ summary: '获取附近教练' })
  async findNearby(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
    @Query('distance') distance: string = '10',
    @Query('limit') limit: string = '20',
  ) {
    return this.coachService.findNearby(
      parseFloat(latitude),
      parseFloat(longitude),
      parseFloat(distance),
      parseInt(limit, 10),
    );
  }

  // 获取教练详情
  @Public()
  @Get(':id')
  @ApiOperation({ summary: '获取教练详情' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coachService.findOne(id);
  }

  // 更新教练信息
  @Put('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新教练信息' })
  async update(
    @CurrentUser('id') userId: number,
    @Body() updateDto: UpdateCoachDto,
  ) {
    return this.coachService.update(userId, updateDto);
  }

  // 获取教练统计数据
  @Get(':id/stats')
  @ApiOperation({ summary: '获取教练统计数据' })
  async getStats(@Param('id', ParseIntPipe) id: number) {
    return this.coachService.getStats(id);
  }
}
