import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString({message: 'content must be a string'})
    @IsNotEmpty({message: 'content must be not empty'})
    readonly content: string;
}