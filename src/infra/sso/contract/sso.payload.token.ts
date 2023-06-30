export interface SsoPayloadToken {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  id_token: string;
  'not-before-policy': number;
  scope: string;
}
