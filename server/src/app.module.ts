import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CoachModule } from './modules/coach/coach.module';
import { CourseModule } from './modules/course/course.module';
import { OrderModule } from './modules/order/order.module';
import { MallModule } from './modules/mall/mall.module';
import { UploadModule } from './modules/upload/upload.module';
import { StudentModule } from './modules/student/student.module';
import { IncomeModule } from './modules/income/income.module';
import { ReviewModule } from './modules/review/review.module';
import { JwtAuthGuard } from './common/guards';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
      envFilePath: ['.env'],
    }),

    // 数据库模块
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'better-sqlite3',
        database:
          configService.get<string>('database.database') || 'data/fitness.db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('database.synchronize') ?? true,
        logging: process.env.NODE_ENV === 'development',
      }),
      inject: [ConfigService],
    }),

    // 业务模块
    AuthModule,
    UserModule,
    CoachModule,
    CourseModule,
    OrderModule,
    MallModule,
    // 新增模块
    UploadModule,
    StudentModule,
    IncomeModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局JWT守卫
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
