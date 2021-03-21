import {Controller, Request, Post, UseGuards, Get, Render, Res, Redirect} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @Get()
    @Render('index')
    root() {
        return { message: 'Hello world!' };
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    @Redirect('/')
    async login(@Request() req, @Res({ passthrough: true }) response: any) {
        const token = await this.authService.login(req.user);
        response.cookie('Authorization', token);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
