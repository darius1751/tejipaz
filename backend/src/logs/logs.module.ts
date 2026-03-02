import { Global, Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './entities/log.entity';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    UserModule
  ],
  controllers: [LogsController],
  providers: [LogsService],
  exports: [LogsService]
})
export class LogsModule { }
