import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findByPhone(phone: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { phone },
    });
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
}
