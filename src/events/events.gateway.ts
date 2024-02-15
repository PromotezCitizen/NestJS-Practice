import { UseGuards, UseInterceptors } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { IncomingHttpHeaders } from 'http';
import { EventsInterceptor } from './events.interceptor';

// @WebSocketGateway(81, {transports: ['websocket']}) // 81번 포트를 'websocket'으로 쓰겠다 선언
@WebSocketGateway({
  cors: {
    origin: '*',
  },
}) // 기본 포트로 설정(3000)
// @UseGuards(EventsGuard)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // socket.io 이용하기 위한 방법
  @WebSocketServer()
  server: Server;

  private rooms: Map<string, Set<Socket>>;

  constructor() {
    this.rooms = new Map<string, Set<Socket>>();
  }
/*
  // handleConnection 과 handleDisconnection 은 Guard 이용 불가
  // 두 함수는 각각 "클라이언트가 연결됐을 때", "클리이언트가 연결 해제됐을 때" 호출이 되므로
  // 가드가 동작하지 않는 것이 정상!
  // ** Guard는 연결 요청을 "처리"하기 전에 실행된다.
  // 즉 "연결이 됨" 과 "연결 요청을 함" 은 별개의 것이다.
*/
  handleConnection(client: Socket, ...args: any[]) {
    const headers = client.handshake.headers;
    const roomName = this.getRoomname(headers);
    // if (headers.authorization !== "Bearer asdf.zxcv.qwer") {
    //   client.send("disconnected");
    //   client.disconnect();
    //   return;
    // }
    if (!this.rooms.get(roomName)) {
      this.rooms.set(roomName, new Set<Socket>());
    }
    const room = this.rooms.get(roomName);
    room.add(client);
    client.send("conneted");
  }

  handleDisconnect(client: Socket) {
    const headers = client.handshake.headers;
    const roomName = this.getRoomname(headers);

    const room = this.rooms.get(roomName);
    room.delete(client);
    if (room.size === 0) {
      this.rooms.delete(roomName);
    }
  }
  
  @SubscribeMessage('events')
  @UseInterceptors(EventsInterceptor)
  handleMessage(
    @MessageBody() data: any, 
    // 클라이언트 정보를 확인하기 위해서는 ConnectedSocket 어노테이션 사용
    @ConnectedSocket() sender: Socket
  ): Observable<WsResponse<number>> {
    const headers = sender.handshake.headers;
    const roomName = this.getRoomname(headers);
    this.sendMessage(sender, roomName, data);
    return;
  }

  private sendMessage(
    sender: Socket,
    roomName: string,
    data: any
  ) {
    const room = this.rooms.get(roomName);
    const token = this.getToken(sender.handshake.headers); // 추후에 토큰에서 값 빼오는걸로 수정 예정
    room.forEach( (client) => {
      if (client !== sender)
        client.send(`${token}:${data}`);
    })
  }

  private getRoomname(
    headers: IncomingHttpHeaders
  ): string | null {
    const roomname = headers.roomname;
    if (typeof roomname !== 'string') {
      return null;
    }
    return roomname as string;
  }

  private getToken(
    headers: IncomingHttpHeaders
  ): string | null {
    const token = headers.authorization;
    if (typeof token !== 'string') {
      return null;
    }
    return token as string;
  }
}
