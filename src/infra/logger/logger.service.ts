import { Injectable, ConsoleLogger } from '@nestjs/common';
import createLogger from './logger';
import { Logger } from 'winston';

@Injectable()
export class LoggerService extends ConsoleLogger {
  customLogger: Logger;

  constructor() {
    super();
    this.customLogger = createLogger();
  }

  log(message) {
    this.customLogger.info(message);
  }

  info(message) {
    this.customLogger.info(message);
  }

  notice(message) {
    this.customLogger.notice(message);
  }

  error(message, stack?) {
    this.customLogger.error(message);
    if (stack) this.customLogger.error(stack);
  }
}
