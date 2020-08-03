import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DialogService } from './dialog.service';
import { DialogController } from './dialog.controller';
import { Dialog } from './dialog.entity';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity';
import { Message } from '../message/message.entity';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    UserModule,
    MessageModule,

    TypeOrmModule.forFeature([Dialog, User, Message]),
  ],
  providers: [DialogService],
  controllers: [DialogController],
})
export class DialogModule {
}
