import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductService } from 'src/product/product.service';
import { PaymentService } from 'src/payment/payment.service';


@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
    private readonly productService: ProductService,
    private readonly paymentService: PaymentService,
  ) { }

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const { items, taxes } = createOrderDto;
    const orderItems: OrderItem[] = [];
    let total = 0;
    let totalTaxes = 0;
    for (const item of items) {
      const product = await this.productService.findOne(item.productId);
      orderItems.push({ product, cant: item.cant, unitPrice: product.price })
      total += item.cant * product.price;
    }
    for (const tax of taxes) {
      totalTaxes += tax.amount;
    }
    total += totalTaxes;
    const payment = await this.paymentService.create({ method: '', mount: total, userId });
    return await this.orderModel.create({ ...createOrderDto, items: orderItems, payment });
  }

  async findAll() {
    return await this.orderModel.find({}, {}, { populate: ['payment'] });
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id, {}, { populate: ['payment'] });
    if (!order)
      throw new BadRequestException(`Not exists order with id: ${id}`);
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);
    return await this.orderModel.findByIdAndUpdate(id, updateOrderDto);
  }

  // async remove(id: string) {
  //   return `This action removes a #${id} order`;
  // }
}
