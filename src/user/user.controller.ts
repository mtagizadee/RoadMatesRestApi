import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import { User } from "@prisma/client";
import {Client} from "./decorator";
import {JwtGuard} from "../auth/guard";

@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get()
    async getAll() {
        const users: User[] = await this.service.getMany({
            include: { profile: true }
        });
        users.forEach((user: User) => delete user.password);
        return users;
    }

    @UseGuards(JwtGuard)
    @Get('/me')
    getMe(@Client() user: User) {
        return user;
    }
}
