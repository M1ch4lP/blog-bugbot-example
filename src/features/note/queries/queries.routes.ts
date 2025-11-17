import { NotFoundApiError } from "../../../shared/errors/api/not-found.error";
import { FastifyInstance } from "fastify";
import {
  GetAllNotesQueryRoute,
  getAllNotesQuerySchema,
} from "./get-all-notes.schema";
import { GetNoteQueryRoute, getNoteQuerySchema } from "./get-note.schema";

export default function registerQueriesRoutes(app: FastifyInstance) {
  app.get<GetAllNotesQueryRoute>(
    "/",
    { schema: getAllNotesQuerySchema },
    async (req, reply) => {
      const notes = await app.noteQueriesService.getAllNotes();
      return reply.code(200).send(notes);
    }
  );

  app.get<GetNoteQueryRoute>(
    "/:id",
    { schema: getNoteQuerySchema },
    async (req, reply) => {
      const note = await app.noteQueriesService.getNoteById(req.params.id);
      if (!note) {
        throw new NotFoundApiError("Note not found");
      }
      return reply.code(200).send(note);
    }
  );
}
