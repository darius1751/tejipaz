import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

  ) { }

  @Post()
  @AllowAnonymous()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto);
  }
  
  @Post('google')
  @AllowAnonymous()
  async createWithGoogle() {
    return await this.authService.createWithGoogle();
  }

  @Post('login/email')
  
  @AllowAnonymous()
  async loginEmail(@Body() loginAuthDto: LoginAuthDto) {
    return await this.authService.login(loginAuthDto);
  }
  // @Get()
  // async findAll() {
  //   return this.authService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // return this.authService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    // return this.authService.update(id, updateAuthDto);
  }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.authService.remove(id);
  // }
}
