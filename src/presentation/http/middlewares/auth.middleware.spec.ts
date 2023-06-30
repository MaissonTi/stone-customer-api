import { instance, mock, verify, anything, when, spy, resetCalls, reset } from 'ts-mockito';
import { SSOService } from '@src/infra/sso/service/sso.service';
import { AuthMiddleware } from './auth.middleware';
import { Request, Response } from 'express';

describe('AuthMiddleware Unit Tests', () => {
  let sut: AuthMiddleware;
  const ssoService = mock(SSOService);
  const next = jest.fn().mockImplementation(() => ({}) /*console.log('Chamou next')*/);

  beforeEach(async () => {
    sut = new AuthMiddleware(instance(ssoService));
  });

  afterEach(async () => {
    resetCalls(ssoService);
  });

  describe('use', () => {
    const token = anything();

    it('Should successfully authenticate', async () => {
      const req = {
        headers: {
          authorization: 'Bearer 123',
        },
      } as Request;
      const res = {} as Response;

      when(ssoService.checkToken(token)).thenResolve(true);

      await sut.use(req, res, next);

      verify(ssoService.checkToken(token)).once();
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('Should not authorize', async () => {
      const req = {
        headers: {
          authorization: 'Bearer 123',
        },
      } as Request;
      const res = {} as Response;

      when(ssoService.checkToken(token)).thenResolve(false);

      try {
        await sut.use(req, res, next);
      } catch (error) {
        expect(error.name).toEqual('UnauthorizedException');
      }

      verify(ssoService.checkToken(token)).once();
      expect(next).not.toHaveBeenCalledTimes(0);
    });

    it('It should report that the token was not found', async () => {
      const req = {
        headers: {
          authorization: undefined,
        },
      } as Request;
      const res = {} as Response;

      try {
        await sut.use(req, res, next);
      } catch (error) {
        expect(error.name).toEqual('NotFoundException');
        expect(error.message).toEqual('Token not found');
      }

      verify(ssoService.checkToken(token)).never();
      expect(next).not.toHaveBeenCalledTimes(0);
    });
  });
});
