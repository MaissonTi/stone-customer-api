import { HttpException, HttpStatus } from '@nestjs/common';

export class IntegrationError extends HttpException {
  constructor(message, status = HttpStatus.BAD_REQUEST) {
    super(message, status);
    this.name = 'IntegrationError';
  }
}
