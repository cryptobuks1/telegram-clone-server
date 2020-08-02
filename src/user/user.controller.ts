import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User } from './user.entity';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { ContactDto } from './dto/contact.dto';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) {
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getAll(@Req() req: Request): Promise<User> {
    return await this.userService.findByPhone((req.user as JwtPayload).phone);
  }

  @Get('contacts')
  @UseGuards(JwtAuthGuard)
  async getContacts(@Req() req: Request): Promise<ContactDto[]> {
    return await this.userService.findContactsById((req.user as JwtPayload).sub);
  }
}
