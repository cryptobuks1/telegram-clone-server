import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';

import { Dialog } from './dialog.entity';
import { UserService } from '../user/user.service';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { User } from '../user/user.entity';

@Injectable()
export class DialogService {
  constructor(
    @InjectRepository(Dialog) private readonly dialogRepository: Repository<Dialog>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
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

  public async findAllByUserId(userId: string): Promise<Dialog[]> {
    return await this.userService.findDialogsById(userId);
  }
}
