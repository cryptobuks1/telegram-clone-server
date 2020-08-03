import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';

import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
  ) {
  }

  public async findById(id: string): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
    });
    if (!message) {
      throw new BadRequestException();
    }
    return message;
  }

  public async removeById(id: string): Promise<Message> {
    return await this.messageRepository.remove(await this.findById(id));
  }
}
