import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>
  ) { }

  async create(createProductDto: CreateProductDto) {

    return 'This action adds a new product';
  }

  async findAll(
    tags: string[],
    categories: string[],
    page: number,
    take: number = 10
  ) {
    const totalRecords = await this.productModel.estimatedDocumentCount();
    const totalPages = Math.ceil(totalRecords / Math.max(take, 1));

    const products = await this.productModel.find({}, {}, { skip: page * take, limit: take, populate: ["categories", "tags"] });
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    return {
      hasPreviousePage: currentPage > 1,
      previousePage: currentPage > 1 ? currentPage - 1 : currentPage,
      page: currentPage,
      hasNextPage: currentPage < totalPages,
      nextPage: currentPage < totalPages ? currentPage + 1 : currentPage,
      products,
      totalPages,
      totalRecords,
    }
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id, {}, { populate: ["categories", "tags"] });
    if (!product)
      throw new BadRequestException(`Not exists product with id: ${id}`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
