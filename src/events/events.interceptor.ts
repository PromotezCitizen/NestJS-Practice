import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class EventsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const client = context.switchToWs().getClient();
    const auth = client.handshake.headers.authorization;
    if (auth.startsWith("Bearer ")) {
      client.handshake.headers.authorization = client.handshake.headers.authorization.slice(7);
    }
    return next.handle();
  }
}
