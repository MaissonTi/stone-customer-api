export interface SsoCheckToken {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  sub: string;
  typ: string;
  azp: string;
  preferred_username: string;
  email_verified: boolean;
  acr: string;
  resource_access: object;
  scope: string;
  clientId: string;
  clientHost: string;
  clientAddress: string;
  client_id: string;
  username: string;
  active: boolean;
}
