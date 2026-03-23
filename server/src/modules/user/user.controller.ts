import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto, SwitchRoleDto } from './dto';
import { CurrentUser } from '../../common/decorators';

@ApiTags('用户')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 获取当前用户信息
  @Get('profile')
  @ApiOperation({ summary: '获取当前用户信息' })
  async getProfile(@CurrentUser('id') userId: number) {
    return await this.userService.getProfile(userId);
  }

  // 更新用户信息
  @Put('profile')
  @ApiOperation({ summary: '更新用户信息' })
  async updateProfile(
    @CurrentUser('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateProfile(userId, updateUserDto);
  }

  // 切换用户角色
  @Put('role')
  @ApiOperation({ summary: '切换用户角色（用户/教练）' })
  async switchRole(
    @CurrentUser('id') userId: number,
    @Body() switchRoleDto: SwitchRoleDto,
  ) {
    return await this.userService.switchRole(userId, switchRoleDto);
  }

  // 获取用户列表（管理员）
  @Get('list')
  @ApiOperation({ summary: '获取用户列表' })
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return await this.userService.findAll(
      parseInt(page, 10),
      parseInt(limit, 10),
    );
  }
}
