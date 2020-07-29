import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserDto } from '../user/dto/user.dto';
import { JwtToken } from './interfaces/jwt-token.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request): Promise<JwtToken> {
    return await this.authService.generateJwtToken((req.user as UserDto));
  }
}
