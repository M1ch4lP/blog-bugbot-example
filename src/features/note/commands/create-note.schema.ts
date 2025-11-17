import { z } from "zod";

export const CreateNoteCommandResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  isPublic: z.boolean().optional(),
  author: z.string().nullable(),
});

export const CreateNoteCommandInputSchema = z.object({
  title: z.string().min(1, "Title required"),
  content: z.string().min(1).max(1000),
  isPublic: z.boolean().optional(),
  author: z.string().nullish(),
});

export const createNoteCommandSchema = {
  body: CreateNoteCommandInputSchema,
  response: {
    201: CreateNoteCommandResultSchema,
  },
};

export type CreateNoteCommandResult = z.infer<
  typeof CreateNoteCommandResultSchema
>;
export type CreateNoteCommandInput = z.infer<
  typeof CreateNoteCommandInputSchema
>;

export type CreateNoteCommandRoute = {
  Body: CreateNoteCommandInput;
  Reply: CreateNoteCommandResult;
};
