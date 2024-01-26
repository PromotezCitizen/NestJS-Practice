import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(id: string, pass: string): Promise<any> {
        if (id === undefined || id === '') {
            throw new BadRequestException();
        }

        const user = await this.usersService.findPasswordWithId(id);

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const { password, ...result } = user;

        // jwt 추가할 부분
        const payload = { sub: user.uid, id: user.id, nickname: user.nickname, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
        // ==============
        return result;
    }
}
