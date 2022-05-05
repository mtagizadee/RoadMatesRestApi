import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {ProfileService} from "./profile.service";
import {Client} from "../user/decorator";
import {UpdateProfileDto} from "./dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtGuard } from "../auth/guard";
import { diskStorage } from "multer";
import e from "express";
import * as uuid from 'uuid';
import * as path from "path";

@Controller('profiles')
export class ProfileController {
    constructor(private readonly service: ProfileService) {}

    @Get()
    async getAll() {
        return await this.service.getMany({});
    }

    @Get(':id')
    async getOne(@Param('id',ParseIntPipe) id: number) {
        return await this.service.getOne({
            where: { id }
        });
    }

    @UseGuards(JwtGuard)
    @Patch()
    @UseInterceptors(FileInterceptor('image',{
        storage: diskStorage({
            destination: `src/profile/avatars`,
            filename(req: e.Request, image: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
                const filename: string = uuid.v4();
                const extension: string = path.parse(image.originalname).ext;
                callback(null, `${filename}${extension}`);
            }
        })
    }))
    async update(
        @Client('id') userId: number,
        @Body() dto: UpdateProfileDto,
        @UploadedFile() image: Express.Multer.File
    ) {
        return await this.service.update({
            userId,
            dto,
            avatar: image.path
        });
    }

    @Get('avatar/:userId')
    async getAvatar(@Param('userId', ParseIntPipe) userId: number) {
        return await this.service.getAvatar(userId);
    }
}
