import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forFeature([Board])
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [
    BoardsService
  ]
})
export class BoardsModule {}
