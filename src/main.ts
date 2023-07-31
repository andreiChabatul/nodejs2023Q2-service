import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const YAML_CONFIG_FILENAME = 'config/api.yaml';
  const port = configService.get('PORT') || 3000;
  const document = yaml.load(readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8')) as OpenAPIObject;
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
