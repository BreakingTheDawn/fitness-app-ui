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
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators';
import { StudentService } from './student.service';
import {
  QueryStudentDto,
  UpdateStudentDto,
  CreateTrainingRecordDto,
  CreateBodyDataDto,
} from './student.dto';

@ApiTags('学员管理')
@ApiBearerAuth()
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // 获取学员列表
  @Get('list')
  @ApiOperation({ summary: '获取学员列表（教练端）' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getStudentList(
    @CurrentUser('coachId') coachId: number,
    @Query() query: QueryStudentDto,
  ) {
    const [students, total] = await this.studentService.findAll(coachId, query);
    return {
      list: students,
      total,
      page: query.page || 1,
      limit: query.limit || 10,
    };
  }

  // 获取学员统计
  @Get('stats')
  @ApiOperation({ summary: '获取学员统计（教练端）' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getStudentStats(@CurrentUser('coachId') coachId: number) {
    return this.studentService.getStats(coachId);
  }

  // 获取学员详情
  @Get(':id')
  @ApiOperation({ summary: '获取学员详情（教练端）' })
  @ApiParam({ name: 'id', description: '学员ID' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 404, description: '学员不存在' })
  async getStudentDetail(
    @CurrentUser('coachId') coachId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.studentService.findOne(coachId, id);
  }

  // 更新学员信息
  @Put(':id')
  @ApiOperation({ summary: '更新学员信息（教练端）' })
  @ApiParam({ name: 'id', description: '学员ID' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiResponse({ status: 404, description: '学员不存在' })
  async updateStudent(
    @CurrentUser('coachId') coachId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateStudentDto,
  ) {
    return this.studentService.update(coachId, id, updateDto);
  }

  // ========== 训练档案相关 ==========

  // 获取训练档案列表
  @Get(':id/records')
  @ApiOperation({ summary: '获取学员训练档案列表（教练端）' })
  @ApiParam({ name: 'id', description: '学员ID' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getTrainingRecords(
    @CurrentUser('coachId') coachId: number,
    @Param('id', ParseIntPipe) id: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const [records, total] = await this.studentService.getTrainingRecords(
      coachId,
      id,
      page || 1,
      limit || 10,
    );
    return {
      list: records,
      total,
      page: page || 1,
      limit: limit || 10,
    };
  }

  // 创建训练档案
  @Post(':id/records')
  @ApiOperation({ summary: '创建学员训练档案（教练端）' })
  @ApiParam({ name: 'id', description: '学员ID' })
  @ApiResponse({ status: 201, description: '创建成功' })
  async createTrainingRecord(
    @CurrentUser('coachId') coachId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() createDto: CreateTrainingRecordDto,
  ) {
    return this.studentService.createTrainingRecord(coachId, id, createDto);
  }

  // ========== 身体数据相关 ==========

  // 获取身体数据历史
  @Get(':id/body-data')
  @ApiOperation({ summary: '获取学员身体数据历史（教练端）' })
  @ApiParam({ name: 'id', description: '学员ID' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getBodyDataHistory(
    @CurrentUser('coachId') coachId: number,
    @Param('id', ParseIntPipe) id: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const [bodyData, total] = await this.studentService.getBodyDataHistory(
      coachId,
      id,
      page || 1,
      limit || 10,
    );
    return {
      list: bodyData,
      total,
      page: page || 1,
      limit: limit || 10,
    };
  }

  // 记录身体数据
  @Post(':id/body-data')
  @ApiOperation({ summary: '记录学员身体数据（教练端）' })
  @ApiParam({ name: 'id', description: '学员ID' })
  @ApiResponse({ status: 201, description: '记录成功' })
  async createBodyData(
    @CurrentUser('coachId') coachId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() createDto: CreateBodyDataDto,
  ) {
    return this.studentService.createBodyData(coachId, id, createDto);
  }
}
