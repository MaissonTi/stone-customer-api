import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './infra/logger/logger.service';
import { SwaggerSetup } from './infra/config/swagger.config';
import { HttpExceptionFilter } from './infra/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });

  app.enableCors();
  const logger = app.get(LoggerService);
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  SwaggerSetup.execute(app);

  const port = config.get<number>('application.port');
  const env = config.get<string>('application.env');

  await app.listen(port).then(() => {
    logger.info('Http server listening at port: ' + port);
    logger.info('Environment: ' + env);
  });
}

bootstrap();
