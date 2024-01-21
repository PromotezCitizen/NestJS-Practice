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

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        uid: id,
      },
    });
  }

  async update(id: number, user: UpdateUserDto) {
    const prevUser = await this.userRepository.findOne({
      where: {
        uid: id
      }
    });
    let userToUpdate = {...prevUser, ...user};
    await this.userRepository.save(userToUpdate);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
  }
}
