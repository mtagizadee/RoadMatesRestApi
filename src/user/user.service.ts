import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateUserDto} from "./dto";
import { Prisma, User } from "@prisma/client";
import * as argon from "argon2";
import {ProfileService} from "../profile/profile.service";

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly profileService: ProfileService
    ) {}

    async getMany(params: Prisma.UserFindManyArgs) {
        return await this.prismaService.user.findMany(params);
    }

    async getOne(params: Prisma.UserFindUniqueArgs) {
        return await this.prismaService.user.findUnique(params);
    }

    async isExist(where: Prisma.UserWhereUniqueInput): Promise<boolean> {
        const user: User = await this.getOne({ where });
        return !!user;
    }

    async createUser(dto: CreateUserDto) {
        try {
            const hash: string = await argon.hash(dto.password);
            const user: User = await this.prismaService.user.create({
                data: {
                    email: dto.email,
                    password: hash
                }
            });
            await this.profileService.create(user.id,{ nickname: dto.nickname });
            return user;
        } catch (error) {
            throw new HttpException('user already exist',HttpStatus.BAD_REQUEST);
        }
    }
}
