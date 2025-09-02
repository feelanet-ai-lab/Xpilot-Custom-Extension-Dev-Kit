import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { McpModule, McpTransportType } from "@rekog/mcp-nest";
import { AuthenticationsModule } from "./authentications/authentications.module";
import { AppService } from "./service/app.service";

@Module({
  imports: [
    McpModule.forRoot({
      name: process.env.SERVER_NAME,
      version: process.env.SERVER_VERSION,
      transport: McpTransportType.STREAMABLE_HTTP,
      streamableHttp: {
        enableJsonResponse: true,
        sessionIdGenerator: undefined,
        statelessMode: true, // No session management
      },
    }),
    HttpModule,
    AuthenticationsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
