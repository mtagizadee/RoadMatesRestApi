import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class ChangePasswordDto {
    @IsEmail({},{message: 'email is not valid'})
    @IsNotEmpty({message: 'email is missing'})
    readonly email: string;

    @IsString({message: 'password must be a string'})
    @Length(4,16,{message: 'length of the password must be greater than 4 and less than 16'})
    @IsNotEmpty({message: 'password is missing'})
    readonly password: string;
}