import { HttpException, HttpStatus, Injectable, StreamableFile } from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {Prisma, User} from "@prisma/client";
import {CreateProfileDto, UpdateProfileDto} from "./dto";
import { createReadStream, ReadStream } from "fs";
import * as path from 'path';

@Injectable()
export class ProfileService {
    constructor(private readonly prismaService: PrismaService) {}

    async getOne(params: Prisma.ProfileFindUniqueArgs) {
        return await this.prismaService.profile.findUnique(params);
    }

    async getMany(params: Prisma.ProfileFindManyArgs) {
        return await this.prismaService.profile.findMany(params);
    }

    async create(userId: number, dto: CreateProfileDto) {
        const user: User = await this.prismaService.user.findUnique({
            where: { id: userId }
        });
        if (!user) throw new HttpException('user is not found',HttpStatus.NOT_FOUND);
        return await this.prismaService.profile.create({
            data: {
                userId,
                ...dto
            }
        });
    }

    async update(params: {
        userId: number,
        dto: UpdateProfileDto,
        avatar?: string
    }) {
        try {
            return await this.prismaService.profile.update({
                where: { userId: params.userId },
                data: {
                    ...params.dto,
                    avatar: params.avatar
                }
            });
        } catch(error) {
            throw new HttpException('profile does not belong to that user', HttpStatus.BAD_REQUEST);
        }
    }

    async getAvatar(userId: number) {
        const avatar: string = (await this.getOne({
            select: { avatar: true },
            where: { userId }
        })).avatar;
        return avatar;
    }
}