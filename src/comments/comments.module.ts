import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { UsersModule } from 'src/users/users.module';
import { EssaysModule } from 'src/essays/essays.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    UsersModule,
    EssaysModule,
    TypeOrmModule.forFeature([Comment])
  ], 
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
