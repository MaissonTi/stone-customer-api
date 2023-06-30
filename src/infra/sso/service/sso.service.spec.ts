import { Test } from '@nestjs/testing';
import { SSOService } from '@src/infra/sso/service/sso.service';
import { HttpService } from 'nestjs-http-promise';
import { ConfigService } from '@nestjs/config';

describe('SSOService Unit Tests', () => {
  let sut: SSOService;
  let httpService;
  let configService;

  const access_token = '123456';

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: { post: jest.fn(), get: jest.fn() },
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn() },
        },
      ],
    }).compile();
    configService = module.get<ConfigService>(ConfigService);
    httpService = module.get<HttpService>(HttpService);

    sut = new SSOService(configService, httpService);

    jest.spyOn(httpService, 'post').mockImplementation(async () => ({
      data: {
        access_token,
      },
    }));
  });

  describe('generateToken', () => {
    it('Should return a token valid', async () => {
      const result = await sut.generateToken();
      expect(result.access_token).toEqual(access_token);
    });

    it('Should return InternalServerErrorException', async () => {
      jest.spyOn(httpService, 'post').mockRejectedValue(async () => new Error());

      try {
        await sut.generateToken();
      } catch (error) {
        expect(error.name).toEqual('InternalServerErrorException');
      }
    });
  });
});
