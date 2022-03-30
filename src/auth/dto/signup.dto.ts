import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class SignupDto {
    @ApiProperty({ example: 'MT', description: 'nickname of the user' })
    @IsString({message: "nickname must be a string"})
    @IsOptional()
    readonly nickname?: string;

    @ApiProperty({ example: 'example@gmail.com', description: 'unqiue email of the user' })
    @IsEmail({}, {message: "email is not valid"})
    @IsNotEmpty({message: "email must be not empty"})
    readonly email: string;

    @ApiProperty({ example: 'Jk!L12_1', description: 'password of the user' })
    @IsString({message: "password must be a string"})
    @IsNotEmpty({message: "password must not be empty"})
    @Length(4,16,{message: "length of the password must be between 4 and 16 characters"})
    readonly password: string;
}