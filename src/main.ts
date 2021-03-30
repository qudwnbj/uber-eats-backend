import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  /*
  함수형 미들웨어 사용
  app.use(jwtMiddleware);
  */
  await app.listen(3000);
}
bootstrap();
