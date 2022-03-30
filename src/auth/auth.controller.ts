import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenDocs } from './docs';
import { SignupDto, SinginDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'sign the user in to the server' })
    @ApiResponse({ status: 200, type: TokenDocs })
    @Post('signin')
    singin(@Body() dto: SinginDto) {
        return this.authService.signIn(dto);
    }

    @ApiOperation({ summary: 'sign the user up to the server' })
    @ApiResponse({ status: 200, type: TokenDocs })
    @Post('signup')
    signup(@Body() dto: SignupDto) {
        return this.authService.signUp(dto);
    }
}