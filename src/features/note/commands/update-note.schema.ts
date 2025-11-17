import { z } from "zod";

export const UpdateNoteCommandResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  isPublic: z.boolean(),
  author: z.string().nullable(),
});

export const UpdateNoteCommandInputSchema = z.object({
  title: z.string().min(1, "Title required").optional(),
  content: z.string().min(1).max(1000).optional(),
  isPublic: z.boolean().optional(),
  author: z.string().nullable().optional(),
});

export const UpdateNoteCommandParamsSchema = z.object({
  id: z.string(),
});

export const updateNoteCommandSchema = {
  params: UpdateNoteCommandParamsSchema,
  body: UpdateNoteCommandInputSchema,
  response: {
    200: UpdateNoteCommandResultSchema,
  },
};

export type UpdateNoteCommandResult = z.infer<
  typeof UpdateNoteCommandResultSchema
>;
export type UpdateNoteCommandInput = z.infer<
  typeof UpdateNoteCommandInputSchema
>;

export type UpdateNoteCommandParams = z.infer<
  typeof UpdateNoteCommandParamsSchema
>;

export type UpdateNoteCommandRoute = {
  Params: UpdateNoteCommandParams;
  Body: UpdateNoteCommandInput;
  Reply: UpdateNoteCommandResult;
};
