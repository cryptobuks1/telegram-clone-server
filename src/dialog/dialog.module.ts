import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DialogService } from './dialog.service';
import { DialogController } from './dialog.controller';
import { Dialog } from './dialog.entity';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity';

@Module({
  imports: [
    UserModule,

    TypeOrmModule.forFeature([Dialog, User])
  ],
  providers: [DialogService],
  controllers: [DialogController],
})
export class DialogModule {
}
