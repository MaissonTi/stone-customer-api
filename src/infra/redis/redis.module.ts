import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Redis, RedisOptions } from 'ioredis';
import { RedisKeysPrefix } from './redis.keys.enum';
import { CacheService } from './services/cache-service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      inject: [Redis],
      provide: 'CacheService',
      useFactory: (redis: Redis) => new CacheService(redis),
    },
    {
      inject: [ConfigService],
      provide: Redis,
      useFactory: (configService: ConfigService) => {
        return new Redis({
          port: configService.get('infra.redis.port'),
          host: configService.get('infra.redis.host'),
          keyPrefix: RedisKeysPrefix.CUSTOMER,
          db: 0,
        } as RedisOptions);
      },
    },
  ],
  exports: ['CacheService'],
})
export class RedisModule {}
