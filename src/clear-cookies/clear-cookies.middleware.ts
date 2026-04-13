import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ClearCookiesMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.setHeader('Set-Cookie', 'Token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly');
    next();
  }
}
