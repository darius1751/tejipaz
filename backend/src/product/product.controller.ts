import { FilesInterceptor } from '@nestjs/platform-express'
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseInterceptors, UploadedFiles, ParseEnumPipe, DefaultValuePipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MongoIdPipe } from 'src/common/pipes/mongo-id/mongo-id.pipe';
import { AllowAnonymous, Roles } from '@thallesp/nestjs-better-auth';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @AllowAnonymous()
  // @Roles(["admin"])
  @UseInterceptors(FilesInterceptor('images', 4, {
    limits: {
      fileSize: 2 * 1048576,
    },

  }))
  create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productService.create(createProductDto, images);
  }

  @Get()
  @AllowAnonymous()
  findAll(
    @Query('name') name: string,
    @Query('tags') tags: string,
    @Query('categories') categories: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number = 10,
  ) {
    return this.productService.findAll({
      name,
      tags: tags?.split?.(";"),
      categories: categories?.split?.(";"),
      page,
      take
    });
  }

  @Get(':id')
  @AllowAnonymous()
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @Roles(["admin"])
  update(@Param('id', MongoIdPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(["admin"])
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.productService.remove(id);
  }
}
