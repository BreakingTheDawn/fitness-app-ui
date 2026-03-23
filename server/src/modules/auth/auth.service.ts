import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/entities/user.entity';
import { LoginDto, RegisterDto } from './dto';

// JWT载荷接口
export interface JwtPayload {
  sub: number;
  openid: string;
  role: string;
}

// 登录响应接口
export interface LoginResponse {
  accessToken: string;
  user: {
    id: number;
    nickname: string;
    avatar: string;
    role: string;
    memberLevel: number;
  };
  expiresIn: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 模拟微信登录
  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({
      where: { openid: loginDto.openid },
    });

    let savedUser: User;

    // 如果用户不存在，自动创建
    if (!user) {
      savedUser = this.userRepository.create({
        openid: loginDto.openid,
        nickname: loginDto.nickname || `用户${Date.now().toString().slice(-6)}`,
        avatar: loginDto.avatar || '',
      });
      savedUser = await this.userRepository.save(savedUser);
    } else {
      savedUser = user;
    }

    // 生成JWT token
    const payload: JwtPayload = {
      sub: savedUser.id,
      openid: savedUser.openid,
      role: savedUser.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: savedUser.id,
        nickname: savedUser.nickname,
        avatar: savedUser.avatar,
        role: savedUser.role,
        memberLevel: savedUser.memberLevel,
      },
      expiresIn: '7d',
    };
  }

  // 注册新用户
  async register(registerDto: RegisterDto): Promise<User> {
    // 生成唯一openid
    const openid = `mock_${uuidv4().replace(/-/g, '')}`;

    const user = this.userRepository.create({
      openid,
      nickname: registerDto.nickname,
      avatar: registerDto.avatar,
      phone: registerDto.phone,
    });

    return this.userRepository.save(user);
  }

  // 验证JWT token
  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: payload.sub });

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    return user;
  }

  // 获取当前用户信息
  async getCurrentUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    return user;
  }
}
