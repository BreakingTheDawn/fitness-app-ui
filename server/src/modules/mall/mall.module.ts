import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MallController } from './mall.controller';
import { MallService } from './mall.service';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [MallController],
  providers: [MallService],
  exports: [MallService],
})
export class MallModule {}
