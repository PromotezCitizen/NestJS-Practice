import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Req, UseInterceptors } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SkipAuth } from 'src/common/auth.metadata';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
    constructor(
        private readonly authService: AuthService,
        private readonly boardsService: BoardsService
    ) {};

    @Post()
    async createBoard(@Body() dto: CreateBoardDto, @Req() req) {
        // const payload = await this.authService.decodeToken(token);
        const payload = req.user; // 이미 토큰 디코딩 해서 req에 넣어놨음!
        // console.log(payload);
        return await this.boardsService.craete(dto, payload.nickname);
    }

    @SkipAuth()
    @Get()
    getAllBoards(@Param('page') page: number = 1) {
        return this.boardsService.findAll(page);
    }

    @SkipAuth()
    @Get(':id')
    getBoard(@Param('id') id: number) {
        return this.boardsService.findOneById(id);
    }

    @Patch(':id')
    modifyBoard() {

    }

    @Delete(':id')
    deleteBoard() {
        
    }
}
