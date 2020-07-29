import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { UserDto } from '../../user/dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'phone',
      passwordField: 'password',
      session: false,
    });
  }

  async validate(phone: string, password: string): Promise<UserDto> {
    const user = await this.authService.validateUser({ phone, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
