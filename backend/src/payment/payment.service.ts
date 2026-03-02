import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<Payment>,
    private readonly userService: UserService
  ) { }
  async create(createPaymentDto: CreatePaymentDto) {
    const { userId } = createPaymentDto;
    await this.userService.findOne(userId);
    return await this.paymentModel.create({ ...createPaymentDto, transactionId: 'ID_Transaction_Platform_Third', payment_commitment: 'PaymentCommitment', status: 'pending' });
  }

  async findAll() {
    return await this.paymentModel.find();
  }

  async findOne(id: string) {
    const payment = await this.paymentModel.findById(id);
    if (!payment)
      throw new BadRequestException(`Not exists payment with id: ${id}`);
    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    await this.findOne(id);
    return await this.paymentModel.findByIdAndUpdate(id, updatePaymentDto);
  }
  async updateStatus(id: string, status: string) {
    await this.findOne(id);
    return await this.paymentModel.findByIdAndUpdate(id, { status });
  }
  // remove(id: string) {
  //   return `This action removes a #${id} payment`;
  // }
}
