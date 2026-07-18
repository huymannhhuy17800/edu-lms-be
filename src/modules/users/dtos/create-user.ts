import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateUserDTO {

    @ApiProperty({ example: 'Manh Huy' })
    @IsString()
    @IsNotEmpty()
    firstName! : string

    @ApiProperty({ example: 'Nguyen' })
    @IsString()
    @IsNotEmpty()
    lastName! : string

    @ApiProperty({ example: 'student@school.edu' })
    @IsEmail()
    @IsNotEmpty()
    email! : string

    @ApiProperty({ minLength: 6 })
    @IsString()
    @MinLength(6)
    password! : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    confirmPassword! : string
}
