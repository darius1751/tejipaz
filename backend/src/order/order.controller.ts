import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { MongoIdPipe } from 'src/common/pipes/mongo-id/mongo-id.pipe';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(
    @Session() session: UserSession,
    @Body() createOrderDto: CreateOrderDto
  ) {
    return this.orderService.create(session.user.id, createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  // @Delete(':id')
  // remove(@Param('id', MongoIdPipe) id: string) {
  //   return this.orderService.remove(id);
  // }
}
