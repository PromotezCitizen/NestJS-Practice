import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Req, UseInterceptors } from '@nestjs/common';
import { SkipAuth } from 'src/common/auth.metadata';
import { EssaysService } from './essays.service';
import { CreateEssayDto } from './dto/create-essay.dto';
import { AuthService } from 'src/auth/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('essays')
@Controller('essays')
export class EssaysController {
  constructor(
        private readonly essaysService: EssaysService,
        private readonly authService: AuthService
  ) {};

    @Post()
  async createEssay(@Body() body: CreateEssayDto, @Req() req) {
    // const payload = await this.authService.decodeToken(token);
    const payload = req.user;
    // console.log(payload);
    return this.essaysService.create(body, payload.nickname);
  }

    @SkipAuth()
    @Get()
    getAllEssays(@Param('page') page: number = 1) {
      return this.essaysService.findAll(page);
    }

    @SkipAuth()
    @Get(':id')
    getEssay(@Param('id') id: number) {
      return this.essaysService.findOne(id);
    }

    @Patch(':id')
    modifyEssay() {
    }

    @Delete(':id')
    deleteEssay() {
    }
}
