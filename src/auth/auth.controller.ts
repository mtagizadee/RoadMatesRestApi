import {Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import {CreateUserDto} from "../user/dto";
import {ChangePasswordDto, LoginUserDto, SendEmailDto, ValidateCodeDto} from "./dto/";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @Post('signup')
    signup(@Body() dto: CreateUserDto) {
        return this.service.sendLinkConfirmationMail(dto);
    }

    @Get('confirm/token=:token')
    confirmUser(@Param('token') token: string) {
        return this.service.confirmUser(token);
    }

    @Post('login')
    login(@Body() dto: LoginUserDto) {
        return this.service.login(dto);
    }

    @Post('forgot-password')
    sendCodeConfirmationMail(@Body() dto: SendEmailDto) {
        return this.service.sendCodeConfirmationMail(dto.email);
    }

    @Post('confirm/code')
    validateCode(@Body() dto: ValidateCodeDto) {
        return this.service.validateCode(dto.email, dto.code);
    }

    @Post('change-password')
    changePassword(@Body() dto: ChangePasswordDto) {
        return this.service.changePassword(dto);
    }
}
