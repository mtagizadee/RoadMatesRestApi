import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Publication, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreatePublicationDto, EditPublicationDto } from './dto';

type PublicationSelectOutput = {
    createdAt?: Date;
    updatedAt?: Date;
    expiredAt?: Date;
    from?: string;
    to?: string;
    criteria?: string;
    price?: number;
    author?: User;
    comments?: Comment[];
}


@Injectable()
export class PublicationService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService    
    ) {}

    async getPublication(params: Prisma.PublicationFindUniqueArgs): Promise<Publication | PublicationSelectOutput> {
        const publication: Publication = await this.prisma.publication.findUnique(params);
        return publication;    
    }

    async getPublications(params: Prisma.PublicationFindManyArgs): Promise<Publication[] | PublicationSelectOutput[]> {
        const publications: Publication[] = await this.prisma.publication.findMany(params);
        const savedPublications: Publication[] = await this.deleteExpiredPublications(publications);
        return savedPublications;
    }

    async createPublication(authorId: number, dto: CreatePublicationDto): Promise<Publication> {
        const expiredAt: Date = new Date();
        expiredAt.setDate(expiredAt.getDate() + 1);

        const publicaiton: Publication = await this.prisma.publication.create({
            data: {
                expiredAt,
                authorId,
                ...dto
            }
        });

        return publicaiton;
    }
    
    async editPublication(where: Prisma.PublicationWhereUniqueInput, authorId: number, dto: EditPublicationDto): Promise<Publication> {
        const isAuthorValidated: boolean = await this.validateAuthor({ authorId, publicationId: where.id }); 
        if (! isAuthorValidated) throw new HttpException('user doesn\'t have this publication',HttpStatus.BAD_REQUEST);
        
        const publication: Publication = await this.prisma.publication.update({
             where,
             data: dto
        });

        return publication;
    }

    async deltetePublication(where: Prisma.PublicationWhereUniqueInput, authorId?: number): Promise<Publication> {
        let isAuthorValidated: boolean = true 
        if (authorId) isAuthorValidated = await this.validateAuthor({ authorId, publicationId: where.id })
        if (! isAuthorValidated) throw new HttpException('user doesn\'t have this publication',HttpStatus.BAD_REQUEST);

        const publication: Publication = await this.prisma.publication.delete({ where });
        return publication;
    }

    private async deleteExpiredPublications(publications: Publication[]): Promise<Publication[]> {
        const now: Date = new Date();
        const savedPublications: Publication[] = [];
        for (let i = 0; i < publications.length; i++) {
            const publication: Publication = publications[i];
            
            if (! publication.expiredAt) continue;
            if (publication.expiredAt >= now) await this.deltetePublication({ id: publication.id });
            else savedPublications.push(publication);
        }

        return savedPublications; 
    }

    private async validateAuthor(identifiers: {
        authorId: number,
        publicationId: number
    }): Promise<boolean> {
        const publicaitons: Publication[] = await this.userService.getPublications({ id: identifiers.authorId });
        return publicaitons.some((publication: Publication) => publication.id === identifiers.publicationId);
    }

    async getComments(where: Prisma.PublicationWhereUniqueInput) {
        const comments: Comment[] = (await this.getPublication({
            where, 
            select: { comments: true} 
        }) as PublicationSelectOutput).comments;
        
        return comments;
    }

    async addComment() {

    }

    async editComment() {

    }

    async deleteComment() {
        
    }
}