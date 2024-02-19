import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { Observable } from 'rxjs';

@Injectable()
export class ExampleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('params: ', request.params);
    console.log('headers: ', request.headers);
    console.log('queries: ', request.query);
    console.log('bodies: ', request.body);

    return true;
  }
}