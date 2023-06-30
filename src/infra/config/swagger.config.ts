import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerSetup {
  static execute(app: INestApplication) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Customer API')
      .setDescription('This is the OpenAPI specifications for the customer api')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api/docs', app, document);
  }
}
