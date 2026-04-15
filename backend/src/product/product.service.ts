import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { uploadImage } from 'src/common/utils/uploadImage';
import { unlinkSync, writeFileSync } from 'fs'
import { CategoryService } from 'src/category/category.service';
import { TagService } from 'src/tag/tag.service';
import { Category } from 'src/category/entities/category.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { extname } from 'path';
import { LogsService } from 'src/logs/logs.service';
import { FilterProductDto } from './dto/filter-product.dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
    private readonly logService: LogsService
  ) { }

  async create(
    createProductDto: CreateProductDto,
    images: Express.Multer.File[]
  ) {
    const { name, description, price, stock, available = true, discount, categories = [], tags = [] } = createProductDto;
    const categoriesMap: Category[] = [];
    const tagsMap: Tag[] = [];
    const imagesUrls: string[] = [];
    for (const category of categories) {
      categoriesMap.push(await this.categoryService.findOne(category))
    }
    for (const tag of tags) {
      tagsMap.push(await this.tagService.findOne(tag))
    }
    const product = await this.productModel.create({ name, description, price, available, discount, stock, categories: categoriesMap, tags: tagsMap });
    let count = 0;
    for (const image of images) {
      writeFileSync(`./temp/${product._id.toJSON()}_${count}${extname(image.originalname)}`, image.buffer)
      imagesUrls.push(await uploadImage(`./temp/${product._id.toJSON()}_${count}${extname(image.originalname)}`, `/products/${product._id.toJSON()}_${count}${extname(image.originalname)}`) || '');
      unlinkSync(`./temp/${product._id.toJSON()}_${count}${extname(image.originalname)}`);
      count++;
    }
    return await product.updateOne({ images: imagesUrls }, { new: true });
  }

  async findAll(
    {
      name,
      tags,
      categories,
      page,
      take = 10
    }: FilterProductDto
  ) {
    const totalRecords = await this.productModel.estimatedDocumentCount();
    const totalPages = Math.ceil(totalRecords / Math.max(take, 1));
    const conditions: any = {
      name: {
        $regex: `/*${name}*/`
      },
      tags: { $in: tags },
      categories: { $in: categories },
    }
    if (!name)
      delete conditions.name;
    if (!tags)
      delete conditions.tags;
    if (!categories)
      delete conditions.categories;
    // tags: !!tags?.length ? tags : undefined,
    // categories: !!categories?.length ? categories : undefined
    const products = await this.productModel.find(conditions, {}, { skip: (page - 1) * take, limit: take, populate: ["categories", "tags"] });
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
  async findOneBySlug(slug: string) {
    const product = await this.productModel.findOne({ slug }, {}, { populate: ["categories", "tags"] });
    if (!product)
      throw new BadRequestException(`Not exists product with slug: ${slug}`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
  }

  async remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
