import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

// 클래스형 미들웨어 (Main.ts 사용 불가능)
//repository / class / dependency injection 사용할때
@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        try {
          const user = await this.userService.findByID(decoded['id']);
          req['user'] = user;
        } catch (e) {}
      }
    }
    next();
  }
}

/* 함수형 미들웨어
함수형 미들웨어 Main.ts 사용가능
export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  next();
}
*/
