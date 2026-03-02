import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRepaymentDto } from './dto/create-repayment.dto';
import { UpdateRepaymentDto } from './dto/update-repayment.dto';
import { Repayment } from './entities/repayment.entity';
import { PaymentService } from 'src/payment/payment.service';
import { Payment } from 'src/payment/entities/payment.entity';

@Injectable()
export class RepaymentService {

  constructor(
    @InjectModel(Repayment.name)
    private readonly repaymentModel: Model<Repayment>,
    private readonly paymentService: PaymentService
  ) { }

  async create(createRepaymentDto: CreateRepaymentDto) {
    const { paymentId } = createRepaymentDto;
    const payment = await this.paymentService.updateStatus(paymentId, "repayment");
    return await this.repaymentModel.create({ payment: <Payment>payment })
  }

  async findAll() {
    return await this.repaymentModel.find({});
  }

  async findOne(id: string) {
    const repayment = await this.repaymentModel.findById(id);
    if (repayment)
      return repayment;
    throw new BadRequestException(`Not exists repayment with id: ${id}`);
  }

  // async update(id: string, updateRepaymentDto: UpdateRepaymentDto) {
  //   return `This action updates a #${id} repayment`;
  // }

  // async remove(id: string) {
  //   return `This action removes a #${id} repayment`;
  // }
}
