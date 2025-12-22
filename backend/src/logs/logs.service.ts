import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

@Injectable()
export class LogsService {

  async create(createLogDto: CreateLogDto) {
    return 'This action adds a new log';
  }

  async findAll() {
    return `This action returns all logs`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} log`;
  }

  async update(id: string, updateLogDto: UpdateLogDto) {
    return `This action updates a #${id} log`;
  }

  async remove(id: string) {
    return `This action removes a #${id} log`;
  }
}
