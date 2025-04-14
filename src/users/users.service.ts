import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcryptjs.hash(createUserDto.password, 10);
    return await this.userRepository.save(createUserDto);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
