import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Model } from 'mongoose';
import { Tag } from './entities/tag.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TagService {

  constructor(
    @InjectModel(Tag.name)
    private readonly tagModel: Model<Tag>
  ) { }

  async create({ name }: CreateTagDto) {
    const tag = await this.tagModel.findOne({ name });
    if (tag)
      throw new BadRequestException(`Exists tag ${name}`);
    return await this.tagModel.create({ name });
  }

  async findAll(all = false) {
    if (!all)
      return await this.tagModel.find({ available: true });
    return await this.tagModel.find();
  }

  async findOne(id: string) {
    const tag = await this.tagModel.findById(id);
    if (!tag)
      throw new BadRequestException(`Not exists tag with id: ${id}`);
    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    await this.findOne(id);
    return await this.tagModel.findByIdAndUpdate(id, updateTagDto, { new: true });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.tagModel.findByIdAndUpdate(id, { available: false }, { new: true });
  }
}
