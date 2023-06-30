export interface ISsoService {
  generateToken(): Promise<ISsoService.Payload>;
  checkToken(token: string): Promise<boolean>;
}

export namespace ISsoService {
  export type Payload = {
    access_token: string;
    expires_in: number;
  };
}
