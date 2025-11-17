import { FastifyInstance } from "fastify";
import {
  CreateNoteCommandRoute,
  createNoteCommandSchema,
} from "./create-note.schema";
import {
  DeleteNoteCommandRoute,
  deleteNoteCommandSchema,
} from "./delete-note.schema";
import {
  UpdateNoteCommandRoute,
  updateNoteCommandSchema,
} from "./update-note.schema";

// TODO: add proper logging to routes
export default function registerCommandsRoutes(app: FastifyInstance) {
  app.post<CreateNoteCommandRoute>(
    "/",
    { schema: createNoteCommandSchema },
    async (req, reply) => {
      const result = await app.noteCommandsService.createNote(req.body);
      return reply.code(201).send(result);
    }
  );

  app.put<UpdateNoteCommandRoute>(
    "/:id",
    { schema: updateNoteCommandSchema },
    async (req, reply) => {
      const note = await app.noteCommandsService.updateNote(
        req.params.id,
        req.body
      );
      return reply.code(200).send(note);
    }
  );

  app.delete<DeleteNoteCommandRoute>(
    "/:id",
    { schema: deleteNoteCommandSchema },
    async (req, reply) => {
      const result = await app.noteCommandsService.deleteNote(req.params.id);
      return reply.code(204).send();
    }
  );
}
