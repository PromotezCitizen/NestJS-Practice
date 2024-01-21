import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly password: string;

    @IsString()
    readonly email: string;

    @IsOptional()
    readonly nickname: string;
}
