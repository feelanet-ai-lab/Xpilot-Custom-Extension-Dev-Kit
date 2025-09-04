import type { Request as ExpressRequest } from "express";

export function sanitizeHttpHeader(request: ExpressRequest) {
  delete request.headers.host;
  delete request.headers.connection;
  delete request.headers["content-length"];
  delete request.headers["accept-encoding"];
  delete request.headers.origin;
  delete request.headers.referer;
}
