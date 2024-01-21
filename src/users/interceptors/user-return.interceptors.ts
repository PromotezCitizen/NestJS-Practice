import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { ReturnUserDto } from "../dto/return-user.dto";

@Injectable()
export class UserReturnInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
            .pipe(
                map((data) => { 
                    const ret = new ReturnUserDto();
                    ret.name = "None";
                    ret.email = "None";
                    ret.nickname = "None";
                    ret.password = "None";
                    return data === null || data === undefined ? ret : data;
                })
            )
    }
}