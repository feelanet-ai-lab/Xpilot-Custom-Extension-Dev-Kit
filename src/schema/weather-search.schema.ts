import { z } from "zod";

// ====================================================================================

export const WeatherSearchParameterSchema = z
  .object({
    city: z
      .enum(["seoul", "tokyo", "newyork"])
      .describe("Select a city: seoul, tokyo, or newyork"),
  })
  .strict();
export type WeatherSearchParameterSchema = z.infer<
  typeof WeatherSearchParameterSchema
>;

// ====================================================================================

export const WeatherSearchDescription = `
Search for current weather information for a specific city.
Available cities: Seoul, Tokyo, New York.
Returns temperature, weather condition, humidity, and wind speed.
`;
