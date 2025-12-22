import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseBoolPipe, DefaultValuePipe } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { MongoIdPipe } from 'src/common/pipes/mongo-id/mongo-id.pipe';
import { AllowAnonymous, Roles } from '@thallesp/nestjs-better-auth';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) { }

  @Post()
  @Roles(["admin"])
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  @AllowAnonymous()
  findAll(@Query('all', new DefaultValuePipe(false), ParseBoolPipe) all = false) {
    return this.tagService.findAll(all);
  }

  @Get(':id')
  @AllowAnonymous()
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.tagService.findOne(id);
  }

  @Patch(':id')
  @Roles(["admin"])
  update(@Param('id', MongoIdPipe) id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  @Roles(["admin"])
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.tagService.remove(id);
  }
}
