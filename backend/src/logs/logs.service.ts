import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './entities/log.entity';
import { UserService } from 'src/user/user.service';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LogsService {

  constructor(
    @InjectModel(Log.name)
    private readonly logModel: Model<Log>,
    private readonly userService: UserService
  ) { }
  async create(createLogDto: CreateLogDto) {
    const { userId } = createLogDto;
    const user = await this.userService.findOne(userId);
    return await this.logModel.create({ ...createLogDto, user });
  }

  async findAll() {
    return await this.logModel.find();
  }
}
