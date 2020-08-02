import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { DialogService } from './dialog.service';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { Dialog } from './dialog.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

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
}
