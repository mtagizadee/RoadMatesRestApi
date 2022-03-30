import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { SignupDto, SinginDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

export type Info = {
    sub: number;
    email: string;
}

export type Token = { token: string }

@Injectable()
export class AuthService {
    
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwt: JwtService
  ) {}

  async signIn(dto: SinginDto) {
      const user: User = await this.prisma.user.findUnique({ where: { email: dto.email }});
      if (!user) throw new HttpException('user doesn\'t exist', HttpStatus.NOT_FOUND);

      const isPasswordRight: boolean = await argon.verify(user.hash, dto.password);
      if (!isPasswordRight) throw new HttpException('wrong password', HttpStatus.FORBIDDEN);

      const token: Token = this.signToken(user.id, user.email);
      return token;
  }

  async signUp(dto: SignupDto) {
    try { 
        const user: User = await this.userService.createUsers(dto);
        const token: Token = this.signToken(user.id, user.email);
        return token;
    } catch (e) {
        throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
    }
  }

  private signToken(userId: number, email: string) {
    const payload: Info = {
      sub: userId,
      email
    }

    const token: string = this.jwt.sign(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET
    });

    return { token }
  }

}