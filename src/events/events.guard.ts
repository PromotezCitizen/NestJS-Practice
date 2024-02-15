import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class EventsGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const headers: IncomingHttpHeaders = client.handshake.headers;
    console.log(headers);
    client.send("guard activated");
    if (!headers.authorization.startsWith("Bearer ")) {
      client.send("Authorization Error. Please check token");
      client.disconnect();
      return false;
    }
    return true;
  }
}
