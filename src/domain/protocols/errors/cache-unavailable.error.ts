import { HttpException, HttpStatus } from '@nestjs/common';

export class CacheUnavailableError extends HttpException {
  constructor() {
    super('Cache Unavailable failed', HttpStatus.BAD_GATEWAY);
    this.name = 'CacheUnavailableError';
  }
}
