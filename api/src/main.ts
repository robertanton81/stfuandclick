import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('STFuandclick')
    .setDescription('The click game API description')
    .setVersion('1.0')
    .addTag('teams')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'stfu API Docs',
  };

  SwaggerModule.setup('api-docs', app, document, customOptions);

  await app.listen(3000);
}
bootstrap();
