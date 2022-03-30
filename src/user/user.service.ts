import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma, Publication } from '@prisma/client';
import { SignupDto } from '../auth/dto'
import * as argon from 'argon2';
import { EditUserDto } from './dto';

type UserSelectOutput = {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    nickname?: string; 
    email?: string;
    hash?: string;
    isBanned?: boolean;
    banReason?: string; 
    publications?: Publication[];
    comments?: Comment[];
}

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    async getUser(params: Prisma.UserFindUniqueArgs): Promise<User | UserSelectOutput> {
        const user: User = await this.prisma.user.findUnique(params);
        delete user.hash;
        return user;
    }

    async getUsers(params: Prisma.UserFindManyArgs): Promise<User[] | UserSelectOutput[]> {
        const users: User[] = await this.prisma.user.findMany(params);
        users.forEach((user: User) => delete user.hash);
        return users; 
    }

    async createUsers(dto: SignupDto): Promise<User> {
        const hash: string = await argon.hash(dto.password);
        const user: User = await this.prisma.user.create({
            data: {
                nickname: dto.nickname,
                email: dto.email,
                hash
            }
        });
        return user; 
    }

    async editUser(where: Prisma.UserWhereUniqueInput, dto: EditUserDto): Promise<User> {
        
        let hash: string;
        if (dto.password) {
            hash = await argon.hash(dto.password)
        }

        const user: User = await this.prisma.user.update({
            where,
            data: {
                nickname: dto.nickname,
                email: dto.email,
                hash
            }
        });

        delete user.hash;
        return user;
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        const user: User = await this.prisma.user.delete({ where });
        delete user.hash;
        return user;
    }

    async getPublications(where: Prisma.UserWhereUniqueInput): Promise<Publication[]> {
        const publications: Publication[] = (await this.prisma.user.findUnique({
            where,
            select: { publications: true }
        })).publications;

        return publications;
    }
}