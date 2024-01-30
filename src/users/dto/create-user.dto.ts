import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly id: string;

    @IsString()
    readonly password: string;

    @IsEmail()
    readonly email: string;

    @IsOptional()
    readonly nickname: string;
}
