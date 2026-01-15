import * as Joi from "joi";

// ==============================================================================

export const joiConfigSchemaValidation = Joi.object({
  MODE: Joi.string().trim().valid("local", "prod").required(),

  EXPOSE_PORT: Joi.number().port().required(),

  NGROK_ACCESS_KEY: Joi.when("MODE", {
    is: "local",
    then: Joi.string().trim().required(),
    otherwise: Joi.string().trim().allow("").optional(),
  }),

  // --------------------------------------------------------------------------
});

// ==============================================================================

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as ngrok from "@ngrok/ngrok";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  logger.verbose(`mode: ${process.env.MODE}`);
  logger.verbose(
    `server name: ${process.env.npm_package_name || "Can not load server name"}`,
  );
  logger.verbose(
    `server version: ${process.env.npm_package_version || "Can not load server version"}`,
  );

  const app = await NestFactory.create(AppModule);

  const exposePort = +process.env.EXPOSE_PORT || 3000;
  logger.verbose(`exposePort: ${exposePort}`);
  await app.listen(exposePort);

  if (process.env.MODE === "local") {
    const ngrokLogger = new Logger("Ngrok");
    await ngrok.connect({
      addr: exposePort,
      authtoken: process.env.NGROK_ACCESS_KEY,
      onLogEvent: (message) => {
        ngrokLogger.debug(message);
      },
      onStatusChange: (status) => {
        ngrokLogger.warn(`Ngrok status changed: ${status}`);
      },
    });
  }
}
bootstrap();
