import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { UserRole } from 'src/common/enums/roles.enum';
import { AuthResponseDto, LoginDTO } from './dtos/auth.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async login(dto: LoginDTO): Promise<AuthResponseDto> {
        const user = await this.prismaService.user.findUnique({
            where: { email: dto.email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!passwordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        if (user.status !== 'ACTIVE') {
            throw new ForbiddenException(`Account is ${user.status.toLowerCase()}`);
        }

        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            roles: user.roles as UserRole[],
        };

        return {
            accessToken: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
                status: user.status,
            },
        };
    }
}
