import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { InfraModule } from '@src/infra/_infra.module';
import { CustomerController } from './http/controllers/customer.controller';
import { CreateCustomer } from '@src/applications/services/create-customer';
import { FindCustomer } from '@src/applications/services/find-customer';
import { UpdateCustomer } from '@src/applications/services/update-customer';
import { CacheService } from '@src/infra/redis/services/cache-service';
import { AuthMiddleware } from './http/middlewares/auth.middleware';

@Module({
  imports: [InfraModule],
  controllers: [CustomerController],
  providers: [
    {
      inject: ['CacheService'],
      provide: 'CreateCustomer',
      useFactory: (cache: CacheService) => new CreateCustomer(cache),
    },
    {
      inject: ['CacheService'],
      provide: 'FindCustomer',
      useFactory: (cache: CacheService) => new FindCustomer(cache),
    },
    {
      inject: ['CacheService', 'FindCustomer'],
      provide: 'UpdateCustomer',
      useFactory: (cache: CacheService, findCustomer: FindCustomer) => new UpdateCustomer(cache, findCustomer),
    },
  ],
})
export class PresentationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: 'customer/*', method: RequestMethod.ALL });
  }
}
