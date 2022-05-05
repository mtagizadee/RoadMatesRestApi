import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import {PublicationService} from "./publication.service";
import {Client} from "../user/decorator";
import {CreatePublicationDto, UpdatePublicationDto} from "./dto";
import {JwtGuard} from "../auth/guard";

@Controller('publications')
export class PublicationController {
    constructor(private readonly service: PublicationService) {}

    @Get()
    async getAll() {
        return await this.service.getMany({});
    }

    @Get('page=:pageNumber')
    async pagination(@Param('pageNumber', ParseIntPipe) pageNumber: number) {
        return await this.service.pagination(pageNumber);
    }

    @Get(':id')
    async getOne(@Param('id',ParseIntPipe) id: number) {
        return await this.service.getOne({
            where: { id }
        });
    }

    @Get('pages/all')
    async getNumberOfPages() {
        return await this.service.getNumberOfPages();
    }

    @UseGuards(JwtGuard)
    @Post()
    async create(@Client('id') authorId: number, @Body() dto: CreatePublicationDto) {
        return await this.service.create(authorId,dto);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    async update(
        @Client('id') authorId: number,
        @Param('id') publicationId: number, 
        @Body() dto: UpdatePublicationDto
    ) {
        //IMPLEMENT IT...
    }
}