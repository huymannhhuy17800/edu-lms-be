import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDTO {

    @IsString() 
    firstname? : string

    @IsString()
    lastname? : string

    @IsEmail()
    @IsNotEmpty()
    email! : string

    password! : string
    confirmPassword! : string
}   