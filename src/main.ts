import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const ssl = process.env.SSL === 'true';
  
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

  const config = app.get(ConfigService);

  const HTTP_PORT = process.env.HTTP_PORT || '3000';
  const APP_HOSTNAME = config.get<string>('APP_HOSTNAME');

  await app.listen(HTTP_PORT, () => {
    const address =
      'http' + (ssl ? 's' : '') + '://' + APP_HOSTNAME + ':' + HTTP_PORT + '/';
    Logger.log('Listening at ' + address);
  });
}
bootstrap();
