import { BadRequestException, Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
    private pageSize: number = 20;

    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,

        private usersService: UsersService,
    ) {}

    async craete(board: CreateBoardDto, nickname: string) {
        const owner =  await this.usersService.findWithNickname(nickname);
        if (!owner) {
            throw new BadRequestException();
        }

        const boardData = new Board();
        boardData.name = board.name;
        boardData.describe = board.describe;
        boardData.owner = owner;

        return this.boardRepository.save(boardData);
    }

    async findAll(page: number): Promise<[Board[], number]> {
        return await this.boardRepository.findAndCount({
            order: {
                createdAt: 'DESC',
            },
            skip: (page - 1) * this.pageSize,
            take: this.pageSize
        })
    }

    findOneByBoardname(boardname: string): Promise<Board> {
        return this.boardRepository.findOne({
            where: {
                name: boardname
            }
        })
    }

    findOneById(id: number): Promise<Board> {
        return this.boardRepository.findOne({
            where: {
                uid: id
            }
        })
    }

    async update(id: number, board: UpdateBoardDto) {
        const prevBoard = await this.boardRepository.findOne({
            where: {
                uid: id,
            }
        })
        if (!prevBoard) {
            throw new BadRequestException();
        }

        prevBoard.name = board.name;
        prevBoard.describe = board.name;

        await this.boardRepository.save(prevBoard);
    }

    async remove(id: number) {
        await this.boardRepository.delete(id);
    }
}
