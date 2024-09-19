import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    //TODO: add keys to env file
    keys: ['asdfghjkl']
  }))

  app.useGlobalPipes(
    new ValidationPipe()
  )
  await app.listen(8080);
}
bootstrap();
