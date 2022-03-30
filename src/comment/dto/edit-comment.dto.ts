import { IsOptional, IsString } from "class-validator";

export class EditCommentDto {
    @IsString({message: 'content must be a string'})
    @IsOptional()
    readonly content?: string;
}