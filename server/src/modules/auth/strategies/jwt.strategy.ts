import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService, JwtPayload } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('jwt.secret') || 'default-secret-key',
    });
  }

  // 验证JWT payload并返回用户信息
  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      openid: user.openid,
      nickname: user.nickname,
      avatar: user.avatar,
      role: user.role,
      memberLevel: user.memberLevel,
      coachId: user.coachId, // 教练ID（如果是教练角色）
    };
  }
}
