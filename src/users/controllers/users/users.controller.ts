import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    constructor(private UsersService: UsersService){}
    @Get()
    getUsers() {
        return this.UsersService.findUsers();
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.UsersService.createUser(createUserDto);
    }
}
