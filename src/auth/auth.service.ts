import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ){}

  async login(loginDto: any) {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const payload = { email: user.email, sub: user.id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          firstName: user.firstName,
          role: user.role
        }
      }
    }
  }
}
