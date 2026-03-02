import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { MongoIdPipe } from 'src/common/pipes/mongo-id/mongo-id.pipe';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',MongoIdPipe) id: string) {
    return this.paymentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',MongoIdPipe) id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  // @Delete(':id')
  // remove(@Param('id',MongoIdPipe) id: string) {
  //   return this.paymentService.remove(id);
  // }
}
