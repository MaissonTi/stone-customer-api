import { HttpException, HttpStatus } from '@nestjs/common';

export class SsoUnavailableError extends HttpException {
  constructor() {
    super('SSO Unavailable failed', HttpStatus.SERVICE_UNAVAILABLE);
    this.name = 'SsoUnavailableError';
  }
}
