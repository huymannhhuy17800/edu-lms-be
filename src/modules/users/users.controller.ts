import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    // Register account
    @Post('/signup')
    async createUserAccount(@Body() createUserDTO : CreateUserDTO) {
        return this.usersService.signup(createUserDTO);
    }

    @Put('/update-profile')
    async updateUserProfile() {

    }

    @Get('/profile')
    async getUserProfile() {

    }

    @Get('/get-all-users')
    async getAllUsersProfile() {

    }

}
