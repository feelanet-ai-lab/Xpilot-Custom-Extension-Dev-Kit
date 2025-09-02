import { Injectable } from "@nestjs/common";
import { IAuthenticationsService } from "./authentications.service.type";

@Injectable()
export class AuthenticationsService implements IAuthenticationsService {
  async validateAccessKey(accessKey: string): Promise<boolean> {
    //**
    // Type your logic here
    // */

    return true;
  }
}
