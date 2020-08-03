import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';

import { User } from './user.entity';
import { ContactDto } from './dto/contact.dto';
import { Dialog } from '../dialog/dialog.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
  }

  public async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async findByPhone(phone: string): Promise<User> {
    return await this.userRepository.findOne({
      relations: ['dialogs'],
      where: { phone },
    });
  }

  public async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }

  public async findContactsById(id: string): Promise<ContactDto[]> {
    const user = await this.userRepository.findOne({
      relations: ['contacts'],
      where: { id },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return user.contacts.map(({ password, ...contacts }) => contacts);
  }

  public async findDialogsById(id: string): Promise<Dialog[]> {
    const user = await this.userRepository.findOne({
      relations: ['dialogs', 'dialogs.users', 'dialogs.messages', 'dialogs.messages.owner'],
      where: { id },
    });
    user.dialogs.forEach(dialog => {
      dialog.users = dialog.users.filter(user => user.id !== id);
    });
    return user.dialogs;
  }
}
