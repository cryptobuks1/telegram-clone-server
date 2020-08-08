import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
import { JwtToken } from './interfaces/jwt-token.interface';
import { ValidateCredentials } from './interfaces/validate-credentials.interface';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(credentials: ValidateCredentials): Promise<UserDto> {
    return await this.userService.findByPhone(credentials.phone);
  }

  async login(loginDto: LoginDto): Promise<JwtToken> {
    const user = await this.userService.findByPhone(loginDto.phone);
    return this.generateJwtToken(user);
  }

  async register(registerDto: LoginDto): Promise<JwtToken> {
    const user = new User();
    user.firstName = 'u' + (1000000 + Math.random() * (9999999 + 1 - 1000000));
    user.username = 'u' + (1000000 + Math.random() * (9999999 + 1 - 1000000));
    user.phone = registerDto.phone;
    return this.generateJwtToken(await this.userService.create(user));
  }

  private generateJwtToken(user: UserDto): JwtToken {
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
