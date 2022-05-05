import {IsEmail, IsNotEmpty, IsNumber} from "class-validator";

export class ValidateCodeDto {
    @IsEmail({},{message: 'email is not valid'})
    @IsNotEmpty({message: 'email is missing'})
    readonly email: string;

    @IsNumber({},{message: 'code must be a number'})
    @IsNotEmpty({message: 'code is missing'})
    readonly code: number;
}