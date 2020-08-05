import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { DialogService } from './dialog.service';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { Dialog } from './dialog.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { AddMessageDto } from './dto/add-message.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { Message } from '../message/message.entity';

@Controller('dialogs')
export class DialogController {
  constructor(
    private readonly dialogService: DialogService,
  ) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllDialogsForUser(@Req() req: Request): Promise<Dialog[]> {
    return await this.dialogService.findAllByUserId((req.user as JwtPayload).sub);
  }


  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createDialog(@Req() req: Request): Promise<Dialog> {
    return await this.dialogService.create(req.body as CreateDialogDto);
  }

  @Get(':id/messages')
  @UseGuards(JwtAuthGuard)
  async getMessages(@Req() req: Request): Promise<Message[]> {
    return await this.dialogService.getMessages({ dialogId: req.params.id } as GetMessagesDto);
  }

  @Post('add.message')
  @UseGuards(JwtAuthGuard)
  async addMessage(@Req() req: Request): Promise<Dialog> {
    return await this.dialogService.addMessage(req.body as AddMessageDto);
  }
}
