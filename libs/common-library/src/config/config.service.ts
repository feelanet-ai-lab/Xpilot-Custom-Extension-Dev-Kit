// 2.1.0

import {
  isBooleanString,
  isJSON,
  isObject,
  isNumberString,
} from "class-validator";
import { existsSync, readFileSync } from "fs";
import { ObjectSchema } from "joi";

function isDecimalString(value: string) {
  return /^\d*\.\d+$/.test(value);
}

/**
 * Load configuration from setting.json file
 * @param filePath example : "./setting.json"
 * @param joiValidation Joi ObjectSchema for validation
 */
export function loadConfiguration(
  filePath: string,
  joiValidation: ObjectSchema<any>,
) {
  try {
    let settingRaw: string;
    if (existsSync(filePath)) {
      settingRaw = readFileSync(filePath, "utf-8");
    }

    if (!settingRaw) {
      settingRaw = "{}";
    }

    let settingInfo: Record<string, string>;
    if (!isJSON(settingRaw)) {
      throw new Error("Invalid setting.json file");
    }

    settingInfo = JSON.parse(settingRaw);
    if (Array.isArray(settingInfo)) {
      throw new Error("Invalid setting.json file");
    }

    if (!isObject(settingInfo)) {
      throw new Error("Invalid setting.json file");
    }

    let env: Record<string, any> = { ...process.env };
    for (const key in env) {
      if (typeof env[key] === "string") {
        const lowerCaseValue = env[key]?.trim()?.toLowerCase();
        if (lowerCaseValue === "null") {
          // null 형식이면 null로 변환
          env[key] = null;
        } else if (
          isNumberString(env[key], { no_symbols: true }) ||
          isDecimalString(env[key])
        ) {
          // 숫자 형식이면 숫자로 변환
          env[key] = Number(env[key]);
        } else if (isBooleanString(lowerCaseValue)) {
          // 불리언 형식이면 불리언으로 변환
          env[key] = JSON.parse(lowerCaseValue);
        } else if (isJSON(env[key])) {
          // JSON 형식이면 JSON으로 변환
          env[key] = JSON.parse(env[key]);
        }
      }
    }

    env = { ...env, ...settingInfo };

    const result = joiValidation.validate(env, {
      convert: true,
      allowUnknown: true,
      stripUnknown: false,
    });
    if (result.error) {
      throw result.error.message;
    }

    for (const key in result.value) {
      switch (typeof result.value[key]) {
        case "string":
          process.env[key] = result.value[key];
          break;
        case "number":
          process.env[key] = result.value[key].toString();
          break;
        case "boolean":
          process.env[key] = JSON.stringify(result.value[key]);
          break;
        case "object":
          process.env[key] = JSON.stringify(result.value[key]);
          break;
        default:
          process.env[key] = result.value[key].toString();
          break;
      }
    }
  } catch (error) {
    throw error;
  }
}
