import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService as AuthServiceBetterAuth } from '@thallesp/nestjs-better-auth';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { auth } from './config/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly authServiceBetterAuth: AuthServiceBetterAuth<typeof auth>,
    private readonly userService: UserService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { credential, ...user } = createUserDto;
    const existsEmail = await this.userService.existsEmail(credential.email);
    if (existsEmail)
      throw new BadRequestException(`Error in create user exists email ${credential.email}`);

    // const newCredential = await this.credentialModel.create({ ...credential, password: encryptedPassword });
    const newCredential = await this.authServiceBetterAuth.api.createUser({
      body: {
        email: credential.email,
        password: credential.password,
        name: user.name,
        role: 'user',
      },
    })
    return await this.userService.create({ ...user, credential: credential }, newCredential.user.id)
  }
  async createWithGoogle() {
    return await this.authServiceBetterAuth.api.signInSocial({
      body: {
        provider: 'google',
        requestSignUp: true,
      }
    })
  }
  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    try {
      const loginData = await this.authServiceBetterAuth.api.signInEmail({
        body: {
          email,
          password,
        }
      });
      return await this.userService.findOneByCredentialId(loginData?.user?.id);

    } catch (err) {
      throw new UnauthorizedException(`Invalid email or password`);
    }
  }

  // async findOneByUsername(username: string) {
  //   const credential = await this.credentialModel.findOne({ username });
  //   if (!credential)
  //     throw new BadRequestException(`Not exists credential`);
  //   return credential;
  // }
  // async existsUsername(username: string) {
  //   return await this.credentialModel.exists({ username });
  // }

  // async findOne(id: string) {
  //   const credential = await this.credentialModel.findById(id);
  //   if (!credential)
  //     throw new BadRequestException(`Not exists credential with id: ${id}`);
  //   return credential;
  // }

  // async update(id: string, updateAuthDto: UpdateAuthDto) {
  //   await this.findOne(id);
  //   if (updateAuthDto.username) {
  //     const existsUsername = await this.existsUsername(updateAuthDto.username);
  //     if (existsUsername)
  //       throw new BadRequestException(`Error in create user exists username`);
  //   }
  //   return await this.credentialModel.findByIdAndUpdate(id, updateAuthDto, { new: true });
  // }
}
