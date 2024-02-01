import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { SkipAuth } from 'src/common/auth.metadata';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Req() req,
    @Body() createCommentDto: CreateCommentDto
  ) {
    const nickname = req.user.nickname;
    return this.commentsService.create(createCommentDto, nickname);
  }

  @SkipAuth()
  @Get()
  findAll(
    @Query('essayId') essayId, 
    @Query('page') page // Query는 무조건 string으로 처리를 한다. : number은 타입 힌트
  ) {
    page = parseInt(page, 10);
    return this.commentsService.findAll(essayId, page);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
