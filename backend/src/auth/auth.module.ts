import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
// import { Credential, CredentialSchema } from './entities/auth.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Credential.name, schema: CredentialSchema }]),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
