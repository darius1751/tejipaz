import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MongoIdPipe } from 'src/common/pipes/mongo-id/mongo-id.pipe';
import { AllowAnonymous, Roles } from '@thallesp/nestjs-better-auth';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @Roles(['admin'])
  create(
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @AllowAnonymous()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @AllowAnonymous()
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @Roles(['admin'])
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.categoryService.remove(id);
  }
}
