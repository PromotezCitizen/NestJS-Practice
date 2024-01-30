import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { BoardsService } from "../boards.service";

@Injectable()
export class BoardOnwerCheckGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
        private boardsService: BoardsService,
    ) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // 
        const request = context.switchToHttp().getRequest();
        const paramValue = request.params.boardid;

        const nickname = request.user.nickname;
        // const payload = { 
        //     sub: user.uid, 
        //     id: user.id, 
        //     nickname: user.nickname, 
        //     email: user.email 
        // };

        const user = await this.usersService.findWithNickname(nickname);
        // const board = await this.boardsService.findOne(params.);



        return true;
    }

}