import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { logger } from './common/middleware/logger/logger.middleware';
import { Test1Middleware } from './common/middleware/test1/test1.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
    configure( consumer: MiddlewareConsumer) { 
      consumer
      .apply(logger)
      .forRoutes("cats")
    }
}
