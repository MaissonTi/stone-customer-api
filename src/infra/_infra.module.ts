import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { RedisModule } from './redis/redis.module';
import { SsoModule } from './sso/sso.module';

@Module({
  imports: [RedisModule, LoggerModule, SsoModule],
  providers: [],
  exports: [RedisModule, LoggerModule, SsoModule],
})
export class InfraModule {}
