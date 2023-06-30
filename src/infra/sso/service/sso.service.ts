import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IntegrationError } from '@src/domain/protocols/errors/intergration.error';
import { SsoUnavailableError } from '@src/domain/protocols/errors/sso-unavailable.error';
import { ISsoService } from '@src/domain/protocols/sso/sso.service.interface';
import { HttpService } from 'nestjs-http-promise';
import { URLSearchParams } from 'url';
import { SsoCheckToken } from '../contract/sso.check.token';
import { SsoPayloadToken } from '../contract/sso.payload.token';

export class SSOService implements ISsoService {
  constructor(private readonly configService: ConfigService, private readonly http: HttpService) {}

  public async generateToken(): Promise<ISsoService.Payload> {
    try {
      const payload = {
        client_secret: this.configService.get('infra.sso.secret'),
        username: this.configService.get('infra.sso.username'),
        client_id: this.configService.get('infra.sso.clientId'),
        password: btoa(this.configService.get('infra.sso.username')),
        scope: 'openid',
        grant_type: 'client_credentials',
      };

      const formData = new URLSearchParams(payload).toString();

      const { data } = await this.http.post<SsoPayloadToken>(
        'auth/realms/careers/protocol/openid-connect/token',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return data;
    } catch (error) {
      this.genericError(error);
    }
  }

  //https://www.keycloak.org/docs/latest/authorization_services/index.html#obtaining-information-about-an-rpt
  public async checkToken(token: string): Promise<boolean> {
    const payload = {
      client_secret: this.configService.get('infra.sso.secret'),
      client_id: this.configService.get('infra.sso.clientId'),
      token,
    };

    const formData = new URLSearchParams(payload).toString();

    try {
      const { data } = await this.http.post<SsoCheckToken>(
        'auth/realms/careers/protocol/openid-connect/token/introspect',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return data.active;
    } catch (error) {
      this.genericError(error);
    }
  }

  private genericError(error: any) {
    if (error.response) {
      console.log(error.response.data);
      throw new IntegrationError('SSO integration error');
    }

    if (error.code === 'ECONNREFUSED') {
      throw new SsoUnavailableError();
    }

    throw new InternalServerErrorException({ cause: error });
  }
}
