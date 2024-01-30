import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SkipAuth } from 'src/common/auth.metadata';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @SkipAuth()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    siginIn(@Body() siginInDto: LoginDto) {
        return this.authService.signIn(siginInDto.id, siginInDto.password);
    }

    // @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user
    }
}
