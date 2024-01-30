import { Module } from '@nestjs/common';
import { EssaysController } from './essays.controller';
import { EssaysService } from './essays.service';
import { AuthModule } from 'src/auth/auth.module';
import { BoardsModule } from 'src/boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Essay } from './entities/essay.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    AuthModule,
    BoardsModule,
    UsersModule,
    TypeOrmModule.forFeature([Essay])
  ],
  controllers: [EssaysController],
  providers: [EssaysService]
})
export class EssaysModule {}
