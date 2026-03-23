import { registerAs } from '@nestjs/config';

// 数据库配置接口
export interface DatabaseConfig {
  type: 'sqlite' | 'postgres';
  database: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  synchronize: boolean;
}

// 导出数据库配置
export default registerAs(
  'database',
  (): DatabaseConfig => ({
    type: (process.env.DATABASE_TYPE as 'sqlite' | 'postgres') || 'sqlite',
    database: process.env.DATABASE_DATABASE || 'data/fitness.db',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : undefined,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    synchronize: process.env.NODE_ENV !== 'production',
  }),
);
