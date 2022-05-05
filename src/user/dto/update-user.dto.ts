import {IsEmail, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class UpdateUserDto {
    @IsEmail({},{message: 'email is not valid'})
    @IsOptional()
    readonly email?: string;

    @IsString({message: 'nickname must be a string'})
    @IsOptional()
    readonly nickname?: string;
}