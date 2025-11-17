import { z } from "zod";

export const DeleteNoteCommandParamsSchema = z.object({
  id: z.string(),
});

export const deleteNoteCommandSchema = {
  params: DeleteNoteCommandParamsSchema,
  response: {
    204: z.void(),
  },
};

export type DeleteNoteCommandRoute = {
  Params: z.infer<typeof DeleteNoteCommandParamsSchema>;
  Reply: void;
};
