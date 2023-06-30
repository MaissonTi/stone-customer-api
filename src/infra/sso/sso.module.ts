import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from 'nestjs-http-promise';
import { SsoConfigService } from './sso.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SSOService } from './service/sso.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      useClass: SsoConfigService,
    }),
  ],
  providers: [
    {
      inject: [ConfigService, HttpService],
      provide: 'SSOService',
      useFactory: (config: ConfigService, http: HttpService) => new SSOService(config, http),
    },
  ],
  exports: ['SSOService'],
})
export class SsoModule {}
