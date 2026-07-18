import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dtos/create-user';

@Injectable()
export class UsersService {

    constructor(private readonly prismaService: PrismaService) {}

    async signup(dto: CreateUserDTO) {
        if (dto.password !== dto.confirmPassword) {
            throw new BadRequestException('Password and confirm password do not match');
        }

        const existingUser = await this.prismaService.user.findUnique({
            where: { email: dto.email },
            select: { id: true },
        });
        if (existingUser) {
            throw new ConflictException('Email is already registered');
        }

        const passwordHash = await this.hashPassword(dto.password);

        const user = await this.prismaService.user.create({
            data: {
                email: dto.email,
                passwordHash,
                firstName: dto.firstName,
                lastName: dto.lastName,
                roles: ['STUDENT'],
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                roles: true,
                status: true,
                createdAt: true,
            },
        });

        return user;
    }

    private hashPassword(password: string) {
        return bcrypt.hash(password,10);
    }
}
