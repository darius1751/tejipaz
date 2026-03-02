import { Controller, Get, Post, Body, Param, } from '@nestjs/common';
import { RepaymentService } from './repayment.service';
import { CreateRepaymentDto } from './dto/create-repayment.dto';
// import { UpdateRepaymentDto } from './dto/update-repayment.dto';
import { MongoIdPipe } from 'src/common/pipes/mongo-id/mongo-id.pipe';

@Controller('repayment')
export class RepaymentController {
  constructor(private readonly repaymentService: RepaymentService) { }

  @Post()
  create(@Body() createRepaymentDto: CreateRepaymentDto) {
    return this.repaymentService.create(createRepaymentDto);
  }

  @Get()
  findAll() {
    return this.repaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.repaymentService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id', MongoIdPipe) id: string, @Body() updateRepaymentDto: UpdateRepaymentDto) {
  //   return this.repaymentService.update(id, updateRepaymentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', MongoIdPipe) id: string) {
  //   return this.repaymentService.remove(id);
  // }
}
