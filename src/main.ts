import { loadConfiguration } from "@lib/common-library";
import * as Joi from "joi";

// ==============================================================================

const joiConfigSchemaValidation = Joi.object({
  MODE: Joi.string().trim().valid("local", "prod").required(),

  EXPOSE_PORT: Joi.number().port().required(),

  NGROK_ACCESS_KEY: Joi.when("MODE", {
    is: "local",
    then: Joi.string().trim().required(),
    otherwise: Joi.string().trim().allow("").optional(),
  }),

  SERVER_NAME: Joi.string().trim().required(),
  SERVER_DESCRIPTION: Joi.string().trim().required(),
  SERVER_VERSION: Joi.string().trim().required(),

  // --------------------------------------------------------------------------
});

loadConfiguration("config.json", joiConfigSchemaValidation);

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as ngrok from "@ngrok/ngrok";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const exposePort = +process.env.EXPOSE_PORT || 3000;
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
