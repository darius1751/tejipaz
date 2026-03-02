import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepaymentService } from './repayment.service';
import { RepaymentController } from './repayment.controller';
import { Repayment, RepaymentSchema } from './entities/repayment.entity';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: RepaymentSchema, name: Repayment.name }]),
    PaymentModule
  ],
  controllers: [RepaymentController],
  providers: [RepaymentService],
})
export class RepaymentModule { }
