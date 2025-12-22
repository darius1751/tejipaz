import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { env } from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { LogsModule } from './logs/logs.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';
import { CommonModule } from './common/common.module';
import { AuthModule as AuthBetterAuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth/config/auth';
import { MailerModule } from '@nestjs-modules/mailer';
import { ReactAdapter } from '@webtre/nestjs-mailer-react-adapter';
import { google } from 'googleapis';

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH_CLIENT_ACCESS_URL,
);
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_OAUTH_CLIENT_REFRESH_TOKEN
})

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    TagModule,
    LogsModule,
    AuthModule,
    AuthBetterAuthModule.forRoot({ auth }),
    UserModule,
    ProductModule,
    PaymentModule,
    OrderModule,
    MongooseModule.forRoot(env.DB_URI || "", {
      dbName: env.DATABASE_NAME,
      auth: {
        username: env.USER_DB,
        password: env.PASSWORD_DB
      }
    }),
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: process.env.GOOGLE_OAUTH_CLIENT_USER,
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_OAUTH_CLIENT_REFRESH_TOKEN,
            accessUrl: process.env.GOOGLE_OAUTH_CLIENT_ACCESS_URL,
            accessToken: await new Promise((resolve, reject) => {
              oAuth2Client.getAccessToken((err, token) => {
                if (err) {
                  reject("Failed to create access token :(");
                }
                resolve(token as string);
              });
            }),
          }
        },
        defaults: {
          from: "Tejipaz"
        },
        template: {
          dir: __dirname + "/emails",
          adapter: new ReactAdapter(),
        }
      }
      )
    }),
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
