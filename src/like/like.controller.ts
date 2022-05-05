import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { Client } from 'src/user/decorator';
import { CreateLikeDto } from './dto';
import { LikeService } from './like.service';

@Controller('likes')
export class LikeController {
    constructor(private readonly service: LikeService) {}

    @Get()
    async getAll() {
        return await this.service.getMany({});
    }

    @Get(':id')
    async getOne(@Param('id',ParseIntPipe) id: number) {
        return await this.service.getOne({ where: { id } });
    }

    @UseGuards(JwtGuard)
    @Post()
    async create(@Client('id') authorId: number, @Body() dto: CreateLikeDto) {
        return await this.service.create(authorId, dto.publicationId);
    }
}