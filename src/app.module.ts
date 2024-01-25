import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { logger } from './common/middleware/logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    CatsModule,
    ConfigModule.forRoot( {
      envFilePath:['.development.env']
    }),
    TypeOrmModule.forRoot({
      type:"mysql",
      host:process.env.DB_HOST,
      port:parseInt(process.env.DB_PORT),
      username:process.env.DB_USER,
      password:process.env.DB_PASS,
      database:process.env.DB_DATABASE,
      entities: [User], // 기본 table 생성
      synchronize: true, // 실사용에서는 데이터 손실 가능
    }),
    UsersModule,
    FilesModule
  ],
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
