import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.useStaticAssets(join(process.cwd(), 'public'))

  const config = new DocumentBuilder()
    .setTitle('Festival Metrausch API')
    .setDescription('The Main API for managing events, bands etc.')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  app.enableCors({
    origin: ['https://metrausch-festival.de', 'localhost:5173' ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true}));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
