import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 用户信息接口
interface RequestUser {
  id: number;
  openid?: string;
  nickname?: string;
  avatar?: string;
  role?: string;
  memberLevel?: number;
  coachId?: number;
}

// 扩展 Request 类型
interface RequestWithUser extends Request {
  user?: RequestUser;
}

// 获取当前登录用户的装饰器
// 支持获取用户的各种属性：id, coachId, role, nickname, avatar, memberLevel
export const CurrentUser = createParamDecorator(
  (
    data: string | undefined,
    ctx: ExecutionContext,
  ): RequestUser | string | number | undefined | null => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    // 如果没有用户信息，返回null
    if (!user) {
      return null;
    }

    // 如果指定了属性名，返回对应属性
    // 支持的属性：id, coachId, role, nickname, avatar, memberLevel, openid
    if (data) {
      return user[data as keyof RequestUser];
    }

    // 返回完整用户对象
    return user;
  },
);

// 常用装饰器快捷方式
export const UserId = () => CurrentUser('id');
export const CoachId = () => CurrentUser('coachId');
export const UserRole = () => CurrentUser('role');
