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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.EXPOSE_PORT || 3000);
}
bootstrap();
