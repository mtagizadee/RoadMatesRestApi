import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateUserDto} from "../user/dto";
import {LoginUserDto} from "./dto/";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import * as argon from "argon2";
import {User, Code} from "@prisma/client";
import {MailService} from "../mail/mail.service";
import {ChangePasswordDto} from "./dto";
import {ProfileService} from "../profile/profile.service";

export type Token = { token: string }

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
        private readonly userService: UserService,
        private readonly profileService: ProfileService
    ) {}

    async sendLinkConfirmationMail(dto: CreateUserDto) {
        const isUserExist: boolean = await this.userService.isExist({email: dto.email});
        if (isUserExist) throw new HttpException('user already exist',HttpStatus.BAD_REQUEST);

        const token: Token = this.signToken(dto,'5m');
        await this.mailService.sendConfirmationMail({
            receiver: {
                nickname: dto.nickname,
                email: dto.email
            },
            content: `${process.env.BASE_URL}/auth/confirm/token=${token.token}`,
            template: 'link-confirmation'
        });
    }

    async confirmUser(token: string) {
        const dto: CreateUserDto = this.jwtService.verify<CreateUserDto>(token,{ secret: process.env.JWT_SECRET });
        const user: User = await this.userService.createUser(dto);
        return this.signToken({
            sub: user.id,
            email: user.email
        },'24h');
    }

    async login(dto: LoginUserDto) {
        const userData: { password: string, id: number } = await this.userService.getOne({
            select: {
                password: true,
                id: true
            },
            where: { email: dto.email }
        });
        if (!userData) throw new HttpException('user is not found',HttpStatus.NOT_FOUND);

        const isPasswordRight: boolean = await argon.verify(userData.password, dto.password);
        if (!isPasswordRight) throw new HttpException('wrong password',HttpStatus.FORBIDDEN);

        return this.signToken({
            sub: userData.id,
            email: dto.email
        }, '24h');
    }

    async sendCodeConfirmationMail(email: string) {
        const isUserExist: boolean = await this.userService.isExist({ email });
        if (!isUserExist) throw new HttpException('user is not found',HttpStatus.NOT_FOUND);

        await this.prismaService.deleteExpiredData(this.prismaService.code.findMany, this.prismaService.code.delete);
        const generateCode: () => number = () => Math.floor(Math.random() * 9001) + 1000;

        const expiredAt: Date = new Date();
        expiredAt.setMinutes(expiredAt.getMinutes() + 10);

        const code: number = generateCode();
        try {
            await this.prismaService.code.create({
                data: { email, expiredAt, code }
            });
        } catch(error) { throw new HttpException('code already exist',HttpStatus.BAD_REQUEST); }

        const userId: number = (await this.userService.getOne({
            select: { id: true },
            where: { email }
        })).id;
        const nickname: string = (await this.profileService.getOne({
            select: { nickname: true },
            where: { userId }
        })).nickname;
        await this.mailService.sendConfirmationMail({
            receiver: {
                email,
                nickname
            },
            content: `${code}`,
            template: 'code-confirmation'
        });
    }

    async validateCode(email: string, code: number) {
        const validCode: number = (await this.prismaService.code.findUnique({
            select: {code: true},
            where: {email}
        })).code;
        if (!validCode) throw new HttpException('code does not exist',HttpStatus.NOT_FOUND);
        if (validCode != code) throw new HttpException('code is not valid', HttpStatus.FORBIDDEN);

        return await this.prismaService.code.update({
            where: { email },
            data: { isConfirmed: true }
        })
    }

    async changePassword(dto: ChangePasswordDto) {
        const code: Code = await this.prismaService.code.findUnique({
            where: { email: dto.email }
        });
        if (!code) throw new HttpException('user is not found in the list of the ones who wants to change password',HttpStatus.NOT_FOUND);
        if (!code.isConfirmed) throw new HttpException('code is not confirmed', HttpStatus.FORBIDDEN);

        const hash: string = await argon.hash(dto.password);
        const user: User = await this.prismaService.user.update({
            where: { email: dto.email },
            data: { password: hash }
        });
        delete user.password;
        return user;
    }

    signToken(payload: any, expiresIn: string): Token {
        const token: string = this.jwtService.sign(payload,{
            expiresIn,
            secret: process.env.JWT_SECRET
        });

        return { token }
    }
}