import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { compare } from '../../utils/crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(name: string, pass: string): Promise<UsersEntity | null> {
    const user = await this.usersService.findByName(name);
    if (user && (await compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: UsersEntity) {
    const payload = user;
    const currDate = new Date();
    const calculatedExpiresIn =
      currDate.getTime() +
      60 * 600 * 1000 -
      (currDate.getTime() - currDate.getMilliseconds()) / 1000;
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: calculatedExpiresIn,
      }),
    };
  }

  async verify(token: string) {
    return this.jwtService.verify(token);
  }

  async decode(token: string) {
    return this.jwtService.decode(token);
  }
}
