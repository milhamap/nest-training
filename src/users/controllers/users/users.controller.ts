import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Put, 
    ParseUUIDPipe, 
    Param, 
    Delete, 
    UsePipes, 
    ValidationPipe 
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { v4 as uuidv4 } from "uuid";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}
    @Get()
    getUsers() {
        return this.usersService.findUsers();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    async updateUserById(
        @Param('id', ParseUUIDPipe) id: uuidv4, 
        @Body() updateUserDto: UpdateUserDto
    ) {
        await this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUserById(@Param('id', ParseUUIDPipe) id: uuidv4) {
        await this.usersService.deleteUser(id);
    }

    @Post(':id/profiles')
    @UsePipes(ValidationPipe)
    createUserProfile(
        @Param('id', ParseUUIDPipe) id: uuidv4, 
        @Body() createUserProfileDto: CreateUserProfileDto
    ) {
        return this.usersService.createUserProfile(id, createUserProfileDto);
    }

    @Post(':id/posts')
    @UsePipes(ValidationPipe)
    createUserPost(
        @Param('id', ParseUUIDPipe) id: uuidv4,
        @Body() createUserPostDto: CreateUserPostDto
    ) {
        return this.usersService.createUserPost(id, createUserPostDto);
    }
}
