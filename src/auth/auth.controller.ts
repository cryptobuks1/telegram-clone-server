import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { JwtToken } from './interfaces/jwt-token.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Post('login')
  async login(@Req() req: Request): Promise<JwtToken> {
    return this.authService.login(req.body);
  }

  @Post('register')
  async register(@Req() req: Request): Promise<JwtToken> {
    return this.authService.register(req.body);
  }
}
