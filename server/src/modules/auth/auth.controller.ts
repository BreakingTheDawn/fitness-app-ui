import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { Public, CurrentUser } from '../../common/decorators';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录接口（模拟微信登录）
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '登录（模拟微信登录）' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // 注册接口
  @Public()
  @Post('register')
  @ApiOperation({ summary: '注册新用户' })
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    // 注册后自动登录
    return this.authService.login({
      openid: user.openid,
      nickname: user.nickname,
      avatar: user.avatar,
    });
  }

  // 获取当前用户信息
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取当前用户信息' })
  async getCurrentUser(@CurrentUser('id') userId: number) {
    return this.authService.getCurrentUser(userId);
  }
}
