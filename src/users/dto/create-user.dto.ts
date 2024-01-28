import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly id: string;

    @IsString()
    readonly password: string;

    @IsString()
    readonly email: string;

    @IsOptional()
    readonly nickname: string;
}
