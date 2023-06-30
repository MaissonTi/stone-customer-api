import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation/_presentation.module';
import { InfraModule } from './infra/_infra.module';
import { ConfigModule } from '@nestjs/config';
import config from './infra/config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    PresentationModule,
    InfraModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
