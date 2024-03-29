import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(uid: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        uid: uid,
      },
    });
  }

  findOneWithId(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id,
      }
    });
  }
  
  // typeorm을 이용한 authentication(인증) 구현
  findPasswordWithId(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id
      },
    });
  }

  findWithNickname(nickname: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        nickname: nickname
      }
    });
  }

  async update(id: number, user: UpdateUserDto) {
    const prevUser = await this.userRepository.findOne({
      where: {
        uid: id
      }
    });
    const userToUpdate = {...prevUser, ...user};
    await this.userRepository.save(userToUpdate);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
  }
}
