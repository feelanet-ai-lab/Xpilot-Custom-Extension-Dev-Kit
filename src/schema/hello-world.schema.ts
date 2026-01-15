import { z } from "zod";

// ====================================================================================

export const HelloWorldParameterSchema = z
  .object({
    name: z.string().trim().min(1).describe("The name of the person"),
    age: z.number().positive().int().describe("The age of the person"),
  })
  .strict();
export type HelloWorldParameterSchema = z.infer<
  typeof HelloWorldParameterSchema
>;

// ====================================================================================

export const HelloWorldDescription = `
Hello world tool for testing
`;
