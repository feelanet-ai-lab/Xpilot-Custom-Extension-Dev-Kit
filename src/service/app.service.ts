import { sanitizeHttpHeader } from "@lib/common-library";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Context as McpContext, Tool as McpTool } from "@rekog/mcp-nest";
import { Request as ExpressRequest } from "express";
import {
  HelloWorldDescription,
  HelloWorldParameterSchema,
} from "src/schema/hello-world.schema";

@Injectable()
export class AppService {
  constructor(private readonly httpSvc: HttpService) {}

  // Hello World 출력
  @McpTool({
    name: "hello-world",
    description: HelloWorldDescription,
    parameters: HelloWorldParameterSchema,
  })
  async hello_world(
    param: HelloWorldParameterSchema,
    context: McpContext,
    request: ExpressRequest,
  ) {
    // 불필요한 헤더 제거
    sanitizeHttpHeader(request);

    // 로직
    return `Hello World ${param.name} ${param.age}`;
  }
}
