export interface IAuthenticationsService {
  validateAccessKey(accessKey: string): Promise<boolean>;
}
