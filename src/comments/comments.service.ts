import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { EssaysService } from 'src/essays/essays.service';
import { Comment } from 'src/comments/entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    private essaysService: EssaysService,
    private usersService: UsersService,
  ) {}

  private pageSize: number = 20;

  async create(createCommentDto: CreateCommentDto, nickname: string) {
    const essay = await this.essaysService.findOne(createCommentDto.essayId);
    const user = await this.usersService.findWithNickname(nickname);

    const commentEntity = new Comment();
    commentEntity.owner = user;
    commentEntity.essay = essay;
    commentEntity.content = createCommentDto.content;

    return this.commentRepository.save(commentEntity);
  }

  async findAll(essayId: number, page: number): Promise<Comment[]> {
    const essay = await this.essaysService.findOne(essayId);
    const comments = await this.commentRepository.find({
      where: {
        essay: essay,
      },
      order: {
        createdAt: 'DESC',
      },
      skip: (page - 1) * this.pageSize,
      take: this.pageSize,
    });
    return comments;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
