import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map, tap } from "rxjs";
import { CreateCatDto } from "src/cats/dto/create-cat.dto";

@Injectable()
export class CatReturnInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();

        return next.handle()
            .pipe( 
                tap((data) => {
                    console.log(data)
                }),
                map((data) => {
                    return data === undefined ? {'test': 1} : data; // return을 해줘야 한다. 무조건!!!
                }),
                tap((data) => {
                    console.log(data)
                }),
                )
    }
}