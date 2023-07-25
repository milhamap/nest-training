import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../typeorm/entities/User';
import { Profile } from '../../../typeorm/entities/Profile';
import { 
    CreateUserParams, 
    UpdateUserParams, 
    CreateUserProfileParams, 
CreateUserPostParams
} from '../../../utils/types';
import { Post } from 'src/typeorm/entities/Post';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postRepository: Repository<Post>
    ) {}

    findUsers() {
        return this.userRepository.find({ relations: ['profile', 'posts'] });
    }

    createUser(userDetails: CreateUserParams) {
        const newUser = this.userRepository.create({
            ...userDetails, 
            createdAt: new Date()
        });
        return this.userRepository.save(newUser);
    }

    updateUser(id: number, updateUserDetails: UpdateUserParams) {
        return this.userRepository.update({ id }, { ...updateUserDetails });
    }

    deleteUser(id: number) {
        return this.userRepository.delete({ id });
    }

    async createUserProfile(id: number, userProfileDetails: CreateUserProfileParams) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) 
            throw new HttpException(
                'User not found. Cannot create Profle ', 
                HttpStatus.BAD_REQUEST
            );
        
        const newUserProfile = this.profileRepository.create(userProfileDetails);
        const savedProfile = await this.profileRepository.save(newUserProfile);
        user.profile = savedProfile;
        return this.userRepository.save(user);
    }

    async createUserPost(id: number, userPostDetails: CreateUserPostParams) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) 
            throw new HttpException(
                'User not found. Cannot create Profle ', 
                HttpStatus.BAD_REQUEST
            );
        
        const newPost = this.postRepository.create({
            ...userPostDetails,
            user
        });
        return this.postRepository.save(newPost);
    }
}
