import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { LogsModule } from './logs/logs.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { ProductModule } from './product/product.module';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RoleModule,
    CategoryModule,
    TagModule,
    LogsModule,
    AuthModule,
    UserModule,
    EmployeeModule,
    ProductModule,
    PaymentModule,
    OrderModule,
    MongooseModule.forRoot(env.DB_URI || "", {
      dbName: env.DATABASE_NAME,
      auth: {
        username: env.USER_DB,
        password: env.PASSWORD_DB
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
