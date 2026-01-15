import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { McpModule, McpTransportType } from "@rekog/mcp-nest";
import { AuthenticationsModule } from "./authentications/authentications.module";
import { AppService } from "./service/app.service";
import { joiConfigSchemaValidation } from "./main";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joiConfigSchemaValidation,
      envFilePath: ".env",
    }),
    McpModule.forRoot({
      name: process.env.npm_package_name || "Can not load server name",
      version: process.env.npm_package_version || "Can not load server version",
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
