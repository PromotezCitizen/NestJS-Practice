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
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard/auth.guard';
import { EventsModule } from './events/events.module';
import { BoardsModule } from './boards/boards.module';
import { EssaysModule } from './essays/essays.module';
import { Board } from './boards/entities/board.entity';
import { Essay } from './essays/entities/essay.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { S3Module } from './s3/s3.module';

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
      entities: [
        User,
        Board,
        Essay,
        Comment,
      ], // 기본 table 생성
      synchronize: true, // 실사용에서는 데이터 손실 가능
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    EventsModule,
    BoardsModule,
    EssaysModule,
    CommentsModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule implements NestModule {
    configure( consumer: MiddlewareConsumer) { 
      consumer
      .apply(logger)
      .forRoutes("cats")
    }
}
