import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const PORT: number = (process.env.PORT as unknown) as number || 3000;
  const HOST: string = process.env.HOST || 'localhost';
  const app = await NestFactory.create(AppModule);

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(PORT, HOST, () => console.log(`SERVER STARTED ON PORT: ${PORT}\nON HOST: ${HOST}`));
}
bootstrap();
