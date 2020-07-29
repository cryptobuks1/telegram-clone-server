import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
import { JwtToken } from './interfaces/jwt-token.interface';
import { ValidateCredentials } from './interfaces/validate-credentials.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(credentials: ValidateCredentials): Promise<UserDto> {
    const user = await this.userService.findByPhone(credentials.phone);
    if (user) {
      if (credentials.password && !await bcrypt.compare(credentials.password, user.password)) {
        return null;
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async generateJwtToken(user: UserDto): Promise<JwtToken> {
    const payload = {
      sub: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      avatar: user.avatar,
      phone: user.phone,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
