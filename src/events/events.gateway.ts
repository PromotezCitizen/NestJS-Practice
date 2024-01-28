import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Observable, from, map } from 'rxjs';
import { Server } from 'socket.io';

// @WebSocketGateway(81, {transports: ['websocket']}) // 81번 포트를 'websocket'으로 쓰겠다 선언
@WebSocketGateway({
  cors: {
    origin: '*',
  },
}) // 기본 포트로 설정(3000)
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  
  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> { 
    return from([1, 2, 3]).pipe(map(item => ({ event: 'message', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
