import {IsEmail, IsNotEmpty} from "class-validator";

export class SendEmailDto {
    @IsEmail({},{message: 'email is not valid'})
    @IsNotEmpty({message: 'email is missing'})
    readonly email: string;
}