import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
const logger = new Logger("main")
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false
  });
  app.useGlobalPipes(new ValidationPipe({
    always: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  }))
  app.setGlobalPrefix('/v1/api');
  app.enableCors();
  const port = process.env.PORT ?? 3000;
  await app.listen(port, () => {
    logger.log(`Run in port: ${port}`)
  });
}
bootstrap();
