import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { MongoIdPipe } from 'src/common/pipes/mongo-id/mongo-id.pipe';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles, Session, type UserSession } from '@thallesp/nestjs-better-auth';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @Roles(["admin"])
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(['admin', 'user'])
  findOne(
    @Param('id', MongoIdPipe) id: string,
    @Session() session: UserSession
  ) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles(['admin', 'user'])
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Session() session: UserSession
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(["admin"])
  remove(
    @Param('id', MongoIdPipe) id: string
  ) {
    return this.userService.remove(id);
  }
}
