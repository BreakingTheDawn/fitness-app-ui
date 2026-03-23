import { SetMetadata } from '@nestjs/common';

// 公开接口元数据key
export const IS_PUBLIC_KEY = 'isPublic';

// 公开接口装饰器，跳过JWT验证
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
