import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Prisma} from "@prisma/client";
import {CreatePublicationDto, UpdatePublicationDto} from "./dto";
import {UserService} from "../user/user.service";

@Injectable()
export class PublicationService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService
    ) {}

    async getOne(params: Prisma.PublicationFindUniqueArgs) {
        await this.prismaService.deleteExpiredData(this.prismaService.publication.findMany, this.prismaService.publication.delete);
        return await this.prismaService.publication.findUnique(params);
    }

    async getMany(params: Prisma.PublicationFindManyArgs) {
        await this.prismaService.deleteExpiredData(this.prismaService.publication.findMany, this.prismaService.publication.delete);
        return await this.prismaService.publication.findMany(params);
    }

    async create(authorId: number, dto: CreatePublicationDto) {
        const isAuthorExist: boolean = await this.userService.isExist({ id: authorId });
        if (!isAuthorExist) throw new HttpException('user is not found',HttpStatus.NOT_FOUND);
        const expiredAt: Date = new Date();
        expiredAt.setDate(expiredAt.getDate() + 1);
        return await this.prismaService.publication.create({
            data: {
                ...dto,
                expiredAt,
                authorId: authorId
            }
        });
    }

    async pagination(pageNumber: number) {
        const numberOfPages: number = await this.getNumberOfPages();
        if (pageNumber > numberOfPages) throw new HttpException('Page does not exist',HttpStatus.NOT_FOUND);

        return await this.getMany({
            skip: (pageNumber - 1) * 5,
            take: 5
        });
    }

    async getNumberOfPages() {
        return Math.ceil((await this.getMany({})).length / 5);
    }
}
