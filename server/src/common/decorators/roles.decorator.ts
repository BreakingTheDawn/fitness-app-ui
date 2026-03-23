import { SetMetadata } from '@nestjs/common';

// 角色元数据key
export const ROLES_KEY = 'roles';

// 角色装饰器，用于标记接口所需角色
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
