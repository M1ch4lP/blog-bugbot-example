import { z } from "zod";

export const GetAllNotesQueryResultSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    isPublic: z.boolean(),
    author: z.string().nullable(),
  })
);

export const getAllNotesQuerySchema = {
  response: {
    200: GetAllNotesQueryResultSchema,
  },
};

export type GetAllNotesQueryResult = z.infer<
  typeof GetAllNotesQueryResultSchema
>;

export type GetAllNotesQueryRoute = {
  Reply: GetAllNotesQueryResult;
};
