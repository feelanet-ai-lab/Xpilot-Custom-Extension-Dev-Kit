import { Module } from "@nestjs/common";
import { AuthenticationsService } from "./service/authentications.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthenticationsGuard } from "./guard/authentications.guard";

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationsGuard,
    },
    AuthenticationsService,
  ],
})
export class AuthenticationsModule {}
