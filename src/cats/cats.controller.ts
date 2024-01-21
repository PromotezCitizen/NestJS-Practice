import { Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, UseGuards, Param, ParseIntPipe, DefaultValuePipe, UseInterceptors } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { ExampleGuard } from './guard/example.guard';

import { Cat } from './interfaces/cat.interface';
import { CatReturnInterceptor } from 'src/common/interceptor/cat-return.interceptor';

@UseGuards(ExampleGuard)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    try {
      return this.catsService.findAll()
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'This is a custom message',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    }
  }

  @UseInterceptors(CatReturnInterceptor)
  @Get(':id')
  async findOne(@Param('id', new DefaultValuePipe(0), ParseIntPipe) id: number): Promise<Cat> {
    try {
      return this.catsService.findOne(id)
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'No Such ID cat exists',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    }
  }
}