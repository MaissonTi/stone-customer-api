import { UnauthorizedException, NotFoundException, Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { SSOService } from '@src/infra/sso/service/sso.service';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject('SSOService')
    private authService: SSOService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    if (!token) {
      throw new NotFoundException('Token not found');
    }

    const isValid = await this.authService.checkToken(token);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    next();
  }
}
