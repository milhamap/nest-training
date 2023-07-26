import { IsInt, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserProfileDto {
    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    age: number;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    dob: Date;
}