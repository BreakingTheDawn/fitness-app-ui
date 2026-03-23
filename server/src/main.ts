import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters';
import { TransformInterceptor } from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 配置静态文件服务 - 用于访问上传的文件
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局响应转换拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // CORS配置
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  });

  // API前缀
  app.setGlobalPrefix('api');

  // Swagger文档配置
  const config = new DocumentBuilder()
    .setTitle('练遇健身 API')
    .setDescription('练遇健身小程序后端API文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 启动服务
  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`🚀 服务已启动: http://localhost:${port}`);
  console.log(`📚 API文档: http://localhost:${port}/api/docs`);
}
void bootstrap();
