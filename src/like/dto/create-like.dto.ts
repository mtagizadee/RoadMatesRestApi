import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLikeDto {
    @IsNumber({},{message: 'publicationId must be a number'})
    @IsNotEmpty({message: 'publicationId is missing'})
    readonly publicationId: number;
}