import { z } from "zod";

export const GetNoteQueryResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  isPublic: z.boolean(),
  author: z.string().nullable(),
  createdAt: z.date(),
});

export const GetNoteQueryParamsSchema = z.object({
  id: z.string(),
});

// TODO: think aboug common error schema for all queries
export const getNoteQuerySchema = {
  params: GetNoteQueryParamsSchema,
  response: {
    200: GetNoteQueryResultSchema,
    404: z.object({
      error: z.string(),
    }),
  },
};

export type GetNoteQueryResult = z.infer<typeof GetNoteQueryResultSchema>;
export type GetNoteQueryParams = z.infer<typeof GetNoteQueryParamsSchema>;

export type GetNoteQueryRoute = {
  Params: GetNoteQueryParams;
  Reply: GetNoteQueryResult;
};
