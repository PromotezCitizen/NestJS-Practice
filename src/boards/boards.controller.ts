import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Req, UseInterceptors, Inject, Query } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SkipAuth } from 'src/common/auth.metadata';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { ApiTags } from '@nestjs/swagger';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';
import { Logger as WinstonLogger } from 'winston';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(
    private readonly authService: AuthService,
    private readonly boardsService: BoardsService,

    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger
  ) {};

  private printWinstonLog(dto) {
    this.logger.error('error: ', dto);
    this.logger.warn('warn: ', dto);
    this.logger.info('info: ', dto);
    this.logger.http('http: ', dto);
    this.logger.verbose('verbose: ', dto);
    this.logger.debug('debug: ', dto);
    this.logger.silly('silly: ', dto);
  }

  @Post()
  async createBoard(@Body() dto: CreateBoardDto, @Req() req) {
    // const payload = await this.authService.decodeToken(token);
    const payload = req.user; // 이미 토큰 디코딩 해서 req에 넣어놨음!
    // console.log(payload);
    return await this.boardsService.craete(dto, payload.nickname);
  }

  @SkipAuth()
  @Get()
  async getAllBoards(@Query('page') page: number = 1) {
    const res = await this.boardsService.findAll(page);
    this.printWinstonLog(res);
    return res;
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
