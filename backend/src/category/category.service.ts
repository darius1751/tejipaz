import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    private readonly mailerService: MailerService
  ) { }
  async create({ name }: CreateCategoryDto) {
    const category = await this.categoryModel.findOne({ name });
    if (category)
      throw new BadRequestException(`Category ${name} exist in DB`)

    return await this.categoryModel.create({ name });
  }

  async findAll() {
    // const emailHtml = await render(<EmailLayout/>);
    return await this.categoryModel.find();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id);
    if (!category)
      throw new BadRequestException(`Not exists category with id: ${id}`);
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    return await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true });
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    await this.categoryModel.findByIdAndDelete(id);
    return category;
  }
}
