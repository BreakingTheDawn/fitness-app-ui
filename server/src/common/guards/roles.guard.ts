import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

// 用户信息接口
interface RequestUser {
  id: number;
  role: string;
  coachId?: number;
}

// 扩展 Request 类型
interface RequestWithUser extends Request {
  user?: RequestUser;
}

// 角色守卫
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 获取接口所需角色
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 如果没有角色要求，直接通过
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    // 如果用户未登录，拒绝访问
    if (!user) {
      throw new ForbiddenException('请先登录');
    }

    // 检查用户角色是否满足要求
    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      throw new ForbiddenException('无权访问此功能');
    }

    return true;
  }
}
