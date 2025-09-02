import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { McpModule, McpTransportType } from "@rekog/mcp-nest";

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
