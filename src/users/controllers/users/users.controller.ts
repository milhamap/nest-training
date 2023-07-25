import { Controller, Get, Post, Body, Put, ParseIntPipe, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}
    @Get()
    getUsers() {
        return this.usersService.findUsers();
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Put(':id')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateUserDto: UpdateUserDto
    ) {
        await this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number) {
        await this.usersService.deleteUser(id);
    }

    @Post(':id/profiles')
    createUserProfile(
        @Param('id', ParseIntPipe) id: number, 
        @Body() createUserProfileDto: CreateUserProfileDto
    ) {
        return this.usersService.createUserProfile(id, createUserProfileDto);
    }

    @Post(':id/posts')
    createUserPost(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserPostDto: CreateUserPostDto
    ) {
        return this.usersService.createUserPost(id, createUserPostDto);
    }
}
