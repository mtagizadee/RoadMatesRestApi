import {IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateProfileDto {
    @IsString({message: 'nickname must be a string'})
    @IsOptional()
    readonly nickname?: string;

    @IsNumber({},{message: 'balance must be a number'})
    @IsOptional()
    readonly balance?: number;

    @IsNumber({},{message: 'rating must be a number'})
    @IsOptional()
    readonly rating?: number;
}