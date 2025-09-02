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

  // todo 목록 조회(모든 list별)
  @McpTool({
    name: "hello-world",
    description: HelloWorldDescription,
    parameters: HelloWorldParameterSchema,
  })
  async get_todo_list(
    param: HelloWorldParameterSchema,
    context: McpContext,
    request: ExpressRequest,
  ) {
    return `Hello World ${param.name} ${param.age}`;
  }
}
