import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreatePublicationDto {
    @IsString({message: 'form must be a string'})
    @IsNotEmpty({message: 'from is missing'})
    readonly from: string;

    @IsString({message: 'to must be a string'})
    @IsNotEmpty({message: 'to is missing'})
    readonly to: string;

    @IsNumber({},{message: 'price must be a number'})
    @IsOptional({message: 'price is missing'})
    readonly price?: number;

    @IsString({message: 'criteria must be a string'})
    @IsOptional()
    readonly criteria?: string;

    @IsString({message: 'additionalInfo must be a string'})
    @IsOptional()
    readonly additionalInfo?: string;
}