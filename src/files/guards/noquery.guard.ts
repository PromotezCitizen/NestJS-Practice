import { CanActivate, ExecutionContext, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class NoQueryGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const query = req.query;
        
    if (!(query && query.file)) {
      throw new HttpException('\'file\' Query Not Found', HttpStatus.BAD_REQUEST);
    }

    return true;
  }
    
}