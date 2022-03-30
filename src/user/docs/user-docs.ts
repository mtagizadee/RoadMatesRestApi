import { ApiProperty } from "@nestjs/swagger";

export class UserDocs {
    @ApiProperty({ example: '1', description: 'unique id of the user'} )
    id: number;
    @ApiProperty({ example: '2022-03-28T20:17:18.186Z', description: 'date when user was registered'} )
    createdAt: Date;
    @ApiProperty({ example: '2022-03-28T20:17:29.567Z', description: 'date when the user last time was edited'} )
    updatedAt: Date;
    @ApiProperty({ example: 'MT', description: 'nickname of the user'} )
    nickname: string | null;
    @ApiProperty({ example: 'example@gmail.com', description: 'unique email of the user'} )
    email: string;
    @ApiProperty({ example: 'true', description: 'expression that shows whether or not user is banned' })
    isBanned: boolean;
    @ApiProperty({ example: 'hacking', description: 'the reason why user was banned' })
    banReason: string | null;
}