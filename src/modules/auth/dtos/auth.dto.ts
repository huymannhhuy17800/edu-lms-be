import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginDTO {
    @ApiProperty({ example: 'teacher@school.edu' })
    @IsEmail()
    email! : string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password! : string;
}

export class AuthResponseDto {
    @ApiProperty()
    accessToken!: string

    @ApiProperty()
    user! : {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        roles: string[];
        status: string;
    }
}
