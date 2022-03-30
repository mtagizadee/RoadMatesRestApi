import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Publication } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { CommentDocs } from 'src/comment/docs';
import { UserInfo } from 'src/user/decorator';
import { PublicationDocs } from './docs';
import { CreatePublicationDto, EditPublicationDto } from './dto';
import { PublicationService } from './publication.service';

@ApiTags('Publications')
@UseGuards(JwtGuard)
@Controller('publications')
export class PublicationController {
    
    constructor(private readonly service: PublicationService) {}

    @ApiOperation({ summary: 'get the publication by id' })
    @ApiResponse({ status: 200, type: PublicationDocs })
    @Get('/:id')
    async getPublication(@Param('id',ParseIntPipe) id: number): Promise<Publication> {
        const publication: Publication = (await this.service.getPublication({ where: { id } }) as Publication);
        return publication;
    }

    @ApiOperation({ summary: 'get all publications' })
    @ApiResponse({ status: 200, type: [PublicationDocs] })
    @Get()
    async getPublications(): Promise<Publication[]> {
        const publications: Publication[] = (await this.service.getPublications({}) as Publication[]);
        return publications;
    }

    @ApiOperation({ summary: 'get certain publicaitons' })
    @ApiResponse({ status: 200, type: [PublicationDocs] })
    @Get('/skip=:skip take=:take')
    async getCertainPublications(@Param('skip', ParseIntPipe) skip: number, @Param('take', ParseIntPipe) take: number): Promise<Publication[]> {
        const publicaitons: Publication[] = (await this.service.getPublications({ skip, take }) as Publication[]);
        return publicaitons;
    }

    @ApiOperation({ summary: 'create the publication' })
    @ApiResponse({ status: 200, type: PublicationDocs })
    @Post()
    async createPublication(@UserInfo('id') authorId: number, @Body() dto: CreatePublicationDto): Promise<Publication> {
        const publication: Publication = await this.service.createPublication(authorId, dto);
        return publication;
    }

    @ApiOperation({ summary: 'edit the publication by id' })
    @ApiResponse({ status: 200, type: PublicationDocs })
    @Patch('/:id')
    async editPublication(@Param('id', ParseIntPipe) id: number, @UserInfo('id') authorId: number, @Body() dto: EditPublicationDto): Promise<Publication> {
        const publicaiton: Publication = await this.service.editPublication({ id }, authorId, dto);
        return publicaiton;
    }

    @ApiOperation({ summary: 'delete the publication by id' })
    @ApiResponse({ status: 200, type: PublicationDocs })
    @Delete('/:id')
    async deletePublication(@Param('id', ParseIntPipe) id: number, @UserInfo('id') authorId: number): Promise<Publication> {
        const publication: Publication = await this.service.deltetePublication({ id }, authorId);
        return publication;
    }

    @ApiOperation({ summary: 'delete the publication by id' })
    @ApiResponse({ status: 200, type: [CommentDocs]})
    @Get(':id/comments')
    async getComments(@Param('id', ParseIntPipe) id: number): Promise<Comment[]> {
        const comments: Comment[] = await this.service.getComments({ id });
        return comments;
    }  
}