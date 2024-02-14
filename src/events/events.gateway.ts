import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';

// @WebSocketGateway(81, {transports: ['websocket']}) // 81번 포트를 'websocket'으로 쓰겠다 선언
@WebSocketGateway({
  cors: {
    origin: '*',
  },
}) // 기본 포트로 설정(3000)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // socket.io 이용하기 위한 방법
  @WebSocketServer()
  server: Server;

  private rooms: Map<string, Set<Socket>> = new Map<string, Set<Socket>>();
  private clients: Set<Socket> = new Set();

  handleConnection(client: Socket, ...args: any[]) {
    const headers = client.handshake.headers;
    const roomName = headers.roomName as string
    if (headers.authorization !== "Bearer asdf.zxcv.qwer") {
      client.send("disconnected");
      client.disconnect();
      return;
    }
    if (!this.rooms.get(roomName)) {
      this.rooms.set(roomName, new Set<Socket>());
    }
    const room = this.rooms.get(roomName);
    room.add(client);
    client.send("conneted");
  }

  handleDisconnect(client: Socket) {
    const headers = client.handshake.headers;
    const roomName = headers.roomName as string

    const room = this.rooms.get(roomName);
    room.delete(client);
    if (room.size === 0) {
      this.rooms.delete(roomName);
    }
  }
  
  @SubscribeMessage('events')
  handleMessage(
    @MessageBody() data: any, 
    // 클라이언트 정보를 확인하기 위해서는 ConnectedSocket 어노테이션 사용
    @ConnectedSocket() sender: Socket
  ): Observable<WsResponse<number>> {
    const headers = sender.handshake.headers;
    const room = this.rooms.get(headers.roomName as string);
    room.forEach( (client) => {
      if (client !== sender) {
        client.send(data);
      }
    });
    return;
  }
}
