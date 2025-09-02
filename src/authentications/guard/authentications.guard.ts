import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthenticationsService } from "../service/authentications.service";

@Injectable()
export class AuthenticationsGuard implements CanActivate {
  private readonly logger = new Logger(AuthenticationsGuard.name);
  constructor(private readonly authSvc: AuthenticationsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      this.logger.error("Authorization header is required");
      throw new UnauthorizedException("Authorization header is required");
    }

    return await this.authSvc.validateAccessKey(authHeader);
  }
}
