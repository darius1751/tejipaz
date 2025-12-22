import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    public readonly userModel: Model<User>
  ) { }

  async findOneByCredentialId(id: string) {
    const user = await this.userModel.findOne({ credentialId: id });
    if (!user)
      throw new BadRequestException(`Not exists user with credential id ${id}`);
    return user;
  }
  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user)
      throw new BadRequestException(`Not exists user with email ${email}`);
    return user;
  }

  async create(createUserDto: CreateUserDto, credentialId: string) {
    const { credential, ...user } = createUserDto;
    return await this.userModel.create({ ...user, credentialId, email: credential.email });
  }

  async findAll() {
    return await this.userModel.find();
  }

  async existsEmail(email: string) {
    return await this.userModel.exists({ email });
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user)
      throw new BadRequestException(`Not exists user id: ${id}`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
