import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class Test1Middleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('testing middleware... 2');
    next();
    console.log('testing middleware... 2 end');
  }
}
