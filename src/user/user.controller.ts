import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Publication, User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { PublicationDocs } from 'src/publication/docs';
import { UserInfo } from './decorator';
import { UserDocs } from './docs';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@ApiTags('Users')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) {}

    @ApiOperation({ summary: 'get the current authorized user' })
    @ApiResponse({ status: 200, type: UserDocs })
    @Get('/me')
    getInfo(@UserInfo() user: User): User {
        return user; 
    }

    @ApiOperation({ summary: 'get the user by id' })
    @ApiResponse({ status: 200, type: UserDocs })
    @Get('/:id')
    async getUser(@Param('id',ParseIntPipe) id: number): Promise<User> {
        const user: User = (await this.service.getUser({ where: { id } }) as User);
        return user;
    }

    @ApiOperation({ summary: 'get all the users of the server' })
    @ApiResponse({ status: 200, type: [UserDocs] })
    @Get()
    async getUsers(): Promise<User[]> {
        const users: User[] = (await this.service.getUsers({}) as User[]);
        return users;
    }

    @ApiOperation({ summary: 'get certain users of the server' })
    @ApiResponse({ status: 200, type: [UserDocs] })
    @Get('/skip=:skip take=:take')
    async getCertainUsers(@Param('skip', ParseIntPipe) skip: number, @Param('take', ParseIntPipe) take: number): Promise<User[]> {
        const users: User[] = (await this.service.getUsers({ skip, take }) as User[]);
        return users;
    }

    @ApiOperation({ summary: 'edit current authorized user' })
    @ApiResponse({ status: 200, type: UserDocs })
    @Patch()
    async editUser(@UserInfo('id') id: number, @Body() dto: EditUserDto): Promise<User> {
        const user: User = await this.service.editUser({ id }, dto);
        return user;
    }

    @ApiOperation({ summary: 'delete current authorized user' })
    @ApiResponse({ status: 200, type: UserDocs })
    @Delete()
    async deleteUser(@UserInfo('id') id: number): Promise<User> {
        const user: User = await this.service.deleteUser({ id });
        return user;
    }

    @ApiOperation({ summary: 'get publications of current authorized user' })
    @ApiResponse({ status: 200, type: [PublicationDocs] })
    @Get('/me/publications')
    async getPublications(@UserInfo('id') id: number): Promise<Publication[]> {
        const publicaitons: Publication[] = await this.service.getPublications({ id });
        return publicaitons;
    }
}