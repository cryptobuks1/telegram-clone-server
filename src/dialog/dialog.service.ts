import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';

import { Dialog } from './dialog.entity';
import { Message } from '../message/message.entity';
import { UserService } from '../user/user.service';
import { MessageService } from '../message/message.service';
import { AddMessageDto } from './dto/add-message.dto';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { RemoveMessageDto } from './dto/remove-message.dto';
import { GetMessagesDto } from './dto/get-messages.dto';

@Injectable()
export class DialogService {
  constructor(
    @InjectRepository(Dialog) private readonly dialogRepository: Repository<Dialog>,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {
  }

  public async create(createDialogDto: CreateDialogDto): Promise<Dialog> {
    const dialog = this.dialogRepository.create();
    dialog.users = [];
    for (const userPhone of createDialogDto.userPhones) {
      dialog.users.push(await this.userService.findByPhone(userPhone));
    }
    return await this.dialogRepository.save(dialog);
  }

  public async findById(id: string): Promise<Dialog> {
    const dialog = await this.dialogRepository.findOne({
      relations: ['users', 'messages'],
      where: { id },
    });
    if (!dialog) {
      throw new BadRequestException();
    }
    return dialog;
  }

  public async findAllByUserId(userId: string): Promise<Dialog[]> {
    const dialogs = await this.userService.findDialogsById(userId);
    return dialogs.sort((a, b) => {
      if (a.messages.length > 0 && b.messages.length > 1) {
        return b.messages[0].createdDate.getTime() - a.messages[0].createdDate.getTime();
      }
    });
  }

  public async getMessages(getMessagesDto: GetMessagesDto): Promise<Message[]> {
    const dialog = await this.dialogRepository.findOne({
      relations: ['messages', 'messages.owner'],
      where: { id: getMessagesDto.dialogId },
    });
    return dialog.messages.sort((a, b) => {
      return a.createdDate.getTime() - b.createdDate.getTime();
    });
  }

  public async addMessage(addMessageDto: AddMessageDto): Promise<Dialog> {
    console.log(addMessageDto);
    if (addMessageDto.text && addMessageDto.text.length > 0) {
      const message = new Message();
      message.text = addMessageDto.text.trim();
      message.type = addMessageDto.type;
      message.owner = await this.userService.findById(addMessageDto.userId);
      const dialog = await this.findById(addMessageDto.dialogId);
      dialog.messages.push(message);
      return await this.dialogRepository.save(dialog);
    }
  }

  public async removeMessage(removeMessageDto: RemoveMessageDto): Promise<Message> {
    console.log(removeMessageDto);
    return await this.messageService.removeById(removeMessageDto.messageId);
  }
}
