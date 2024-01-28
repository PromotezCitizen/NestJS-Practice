import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, BadRequestException, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserReturnInterceptor } from './interceptors/user-return.interceptors';
import { Response, Request } from 'express';
import { SkipAuth } from 'src/common/auth.metadata';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SkipAuth()
  @Post() // 회원가입
  // @Redirect() -> Http 메소드를 변경 불가.
  // 프론트에서 받으면 다시 request를 하는 방식으로 동작해야 함.
  // 308으로 보내면 메소드를 유지, 301으로 하면 메소드가 바뀔지도?
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    // @Res() res: Response    에서 Response는 express의 객체로 해야한다. tab tab 하다가는 이상한거 불러온다...
    const existUser = await this.usersService.findOneWithId(createUserDto.id);

    if (existUser) {
      throw new BadRequestException();
    }
    // console.log(existUser);
    const { password, ...profile } = await this.usersService.create(createUserDto);
    // 여기서 토큰을 줄 것인가? 아니면 어떻게 할 것인가?

    res.setHeader('token', 'asdf');
    res.status(HttpStatus.OK).json(profile);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(UserReturnInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
