import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Essay } from './entities/essay.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEssayDto } from './dto/create-essay.dto';
import { UsersService } from 'src/users/users.service';
import { BoardsService } from 'src/boards/boards.service';
import { UpdateEssayDto } from './dto/update-user.dto';

@Injectable()
export class EssaysService {
    private pageSize: number = 20;

    constructor(
        @InjectRepository(Essay)
        private essayRepository: Repository<Essay>,

        private usersService: UsersService,
        private boardsService: BoardsService
    ) {};

    async findAll(page: number): Promise<[Essay[], number]> {
        return await this.essayRepository.findAndCount({
            order: {
                createdAt: 'DESC',
            },
            skip: (page - 1) * this.pageSize,
            take: this.pageSize
        });
    }

    findOne(id: number): Promise<Essay> {
        return this.essayRepository.findOne({
            where: {
                uid: id,
            }
        });
    }

    async create(essay: CreateEssayDto, nickname: string) {
        const userInfo = await this.usersService.findWithNickname(nickname);
        const boardInfo = await this.boardsService.findOneByBoardname(essay.board);

        let essayInfo = new Essay();
        essayInfo.board = boardInfo;
        essayInfo.owner = userInfo;
        essayInfo.title = essay.title;
        essayInfo.content = essay.content;
        
        return this.essayRepository.save(essayInfo);
    }

    async update(essay: UpdateEssayDto, nickname: string) {
        const prevBoard = await this.essayRepository.findOne({
            where: {
                title: essay.title
            }
        });
        prevBoard.title = essay.title;
        prevBoard.content = essay.content;
        await this.essayRepository.save(prevBoard);
    }

    async remove(id: number) {
        await this.essayRepository.delete(id);
    }
}
