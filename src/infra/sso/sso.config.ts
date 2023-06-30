import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { HttpModuleOptions, HttpModuleOptionsFactory } from 'nestjs-http-promise';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class SsoConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly configService: ConfigService, private readonly logger: LoggerService) {}

  async createHttpOptions(): Promise<HttpModuleOptions> {
    return {
      baseURL: this.configService.get<string>('infra.sso.url'),
      retries: this.configService.get<number>('httpRetry.attempts'),
      timeout: this.configService.get<number>('httpRetry.timeout'),
      retryDelay: (retryNumber: number) => {
        const delay = 400 * retryNumber;
        const randomSum = delay * 0.2 * Math.random(); // 0-20% of the delay
        return delay + randomSum;
      },
      retryCondition: (error: AxiosError) => this.hasNoResponse(error) || this.isRetryableError(error),
      onRetry: (retryCount, error) => {
        this.logger.notice(
          `[SSO CLient] Request failed. We will retry [count: ${retryCount} / error_message: ${error.message}]`,
        );
      },
    };
  }

  private isRetryableError(error: AxiosError): boolean {
    const isServerStatusError = error?.response.status >= 500 && error?.response.status <= 599;
    const isTimeoutStatusError = error?.response.status === HttpStatus.REQUEST_TIMEOUT;

    return error.code !== 'ECONNABORTED' && (!error.response || isServerStatusError || isTimeoutStatusError);
  }

  private hasNoResponse(error: AxiosError): boolean {
    return !error.response;
  }
}
