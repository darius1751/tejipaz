import { Controller, Get, Post, Body, Patch, Param, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { type Response } from 'express';


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
  async loginEmail(
    @Res({ passthrough: true }) response: Response,
    @Body() loginAuthDto: LoginAuthDto
  ) {
    const login = await this.authService.login(loginAuthDto);
    response.cookie(`user`, JSON.stringify(login), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });
    response.cookie(`token`, login.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });
    return login;
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
