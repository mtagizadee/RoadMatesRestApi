import { Injectable } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto, EditCommentDto } from './dto';

@Injectable()
export class CommentService {

    constructor(private readonly prisma: PrismaService) {}

    async getComment(params: Prisma.CommentFindUniqueArgs): Promise<Comment> {
        const comment: Comment = await this.prisma.comment.findUnique(params);
        return comment;
    }

    async getCommetns(params: Prisma.CommentFindManyArgs) {
        const comments: Comment[] = await this.prisma.comment.findMany(params);
        return comments;
    }

    async createComments(identifiers: {
        authorId: number,
        publicationId: number
    }, dto: CreateCommentDto) {
        const comment: Comment = await this.prisma.comment.create({ data: {
            authorId: identifiers.authorId,
            publicationId: identifiers.publicationId,
            ...dto
        } });

        return comment;
    }

    async editComment(where: Prisma.CommentWhereUniqueInput, dto: EditCommentDto) {
        const comment: Comment = await this.prisma.comment.update({
            where,
            data: dto
        });

        return comment;
    }

    async deleteComment(where: Prisma.CommentWhereUniqueInput) {
        const comment: Comment = await this.prisma.comment.delete({ where });
        return comment;
    }
}