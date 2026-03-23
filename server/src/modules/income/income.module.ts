import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';
import { Withdrawal, IncomeRecord } from './entities';
import { Coach } from '../coach/entities/coach.entity';
import { Order } from '../order/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Withdrawal, IncomeRecord, Coach, Order])],
  controllers: [IncomeController],
  providers: [IncomeService],
  exports: [IncomeService],
})
export class IncomeModule {}
