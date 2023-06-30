export interface ICacheService {
  set(key: string, data: string): Promise<string>;
  get(keys: string): Promise<string>;
  all(): Promise<Array<string>>;
  hasKey(key: string): Promise<boolean>;
}
