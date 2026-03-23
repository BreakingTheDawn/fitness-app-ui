import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto, QueryCourseDto } from './dto';
import { CurrentUser, Public } from '../../common/decorators';

@ApiTags('课程')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // 创建课程
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建课程（教练）' })
  async create(
    @CurrentUser('coachId') coachId: number,
    @Body() createDto: CreateCourseDto,
  ) {
    return this.courseService.create(coachId, createDto);
  }

  // 获取课程列表
  @Public()
  @Get('list')
  @ApiOperation({ summary: '获取课程列表' })
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query() query: QueryCourseDto,
  ) {
    return this.courseService.findAll(
      parseInt(page, 10),
      parseInt(limit, 10),
      query,
    );
  }

  // 获取教练的课程
  @Get('my')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取我的课程列表' })
  async findByCoach(@CurrentUser('coachId') coachId: number) {
    return this.courseService.findByCoach(coachId);
  }

  // 获取课程详情
  @Public()
  @Get(':id')
  @ApiOperation({ summary: '获取课程详情' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.findOne(id);
  }

  // 更新课程
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新课程' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('coachId') coachId: number,
    @Body() updateDto: UpdateCourseDto,
  ) {
    return this.courseService.update(id, coachId, updateDto);
  }

  // 删除课程
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除课程' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('coachId') coachId: number,
  ) {
    await this.courseService.remove(id, coachId);
    return { message: '删除成功' };
  }
}
