import { registerAs } from '@nestjs/config';

// JWT配置接口
export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

// 导出JWT配置
export default registerAs(
  'jwt',
  (): JwtConfig => ({
    secret: process.env.JWT_SECRET || 'default-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  }),
);
