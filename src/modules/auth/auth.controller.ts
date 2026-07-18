import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponseDto, LoginDTO } from './dtos/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Log in with email and password' })
    @ApiOkResponse({ type: AuthResponseDto })
    login(@Body() dto: LoginDTO): Promise<AuthResponseDto> {
        return this.authService.login(dto);
    }
}
