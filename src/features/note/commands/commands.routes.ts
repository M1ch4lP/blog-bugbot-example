import { FastifyInstance } from "fastify";
import {
  CreateNoteCommandRoute,
  createNoteCommandSchema,
} from "./create-note.schema";
import {
  DeleteNoteCommandRoute,
  deleteNoteCommandSchema,
} from "./remove-note.schema";
import {
  UpdateNoteCommandRoute,
  updateNoteCommandSchema,
} from "./update-note.schema";
import {
  GetAllNotesQueryRoute,
  getAllNotesQuerySchema,
} from "../queries/get-all-notes.schema";

// TODO: add proper logging to routes
export default function registerCommandsRoutes(app: FastifyInstance) {
  app.post<CreateNoteCommandRoute>(
    "/",
    { schema: createNoteCommandSchema },
    async (req, reply) => {
      const result = await app.commandsService.createNote(req.body);
      return reply.code(201).send(result);
    }
  );

  app.put<UpdateNoteCommandRoute>(
    "/:id",
    { schema: updateNoteCommandSchema },
    async (req, reply) => {
      const note = await app.commandsService.updateNote(
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
      const result = await app.commandsService.deleteNote(req.params.id);
      return reply.code(204).send();
    }
  );

  app.get<GetAllNotesQueryRoute>(
    "/",
    { schema: getAllNotesQuerySchema },
    async (req, reply) => {
      const notes = await app.noteQueriesService.getAllNotes();
      return reply.code(200).send(notes);
    }
  );
}
