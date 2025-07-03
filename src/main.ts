import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Servihub')
    .setDescription('...')
    .addCookieAuth('refresh_token') // suporte a cookies (auth)
    .addBearerAuth() // suporte a JWT
    .addTag('Módulos') // organização por tags
    .setVersion('0.2.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
