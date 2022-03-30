import { ApiProperty } from "@nestjs/swagger";

export class CommentDocs {
    @ApiProperty({ example: '1', description: 'unique identifier of a comment'} )
    id: number;
    @ApiProperty({ example: '2022-03-28T20:17:29.567Z', description: 'date when comment was created'} )
    createdAt: Date;
    @ApiProperty({ example: '2022-03-28T20:17:29.567Z', description: 'date when comment was updated last time'} )
    updatedAt: Date;
    @ApiProperty({ example: 'Hello, there!', description: 'content of the comment'} )
    content: string;
    @ApiProperty({ example: '2022-03-28T20:17:29.567Z', description: 'id of the author of a comment'} )
    authorId: number;
    @ApiProperty({ example: '2022-03-28T20:17:29.567Z', description: 'id of the publicaiton to which a comment belongs to'} )
    publicationId: number;
}