import { Injectable, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLikeDto } from './dto';

@Injectable()
export class LikeService {
    constructor(private readonly prismaService: PrismaService) {}

    async getOne(params: Prisma.LikeFindUniqueArgs) {
        return await this.prismaService.like.findUnique(params);
    }

    async getMany(params: Prisma.LikeFindManyArgs) {
        return await this.prismaService.like.findMany(params);
    }

    async create(authorId: number, publicationId: number) {
        return await this.prismaService.like.create({
            data: {
                authorId,
                publicationId
            }
        });
    }
}