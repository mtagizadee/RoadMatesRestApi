import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const PORT: number = (process.env.PORT as unknown) as number || 3000;
  const app = await NestFactory.create(AppModule);

  const config: any = new DocumentBuilder()
    .setTitle('API')
    .setDescription('documentation of API')
    .setVersion('1.0.0')
    .addTag('NestJs')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('/',app,document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));
}
bootstrap();
