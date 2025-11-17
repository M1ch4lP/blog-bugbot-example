import { NoteRepository } from "./repository.js";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { NotesCommandsService } from "./commands/commands.service.js";
import registerCommandsRoutes from "./commands/commands.routes.js";
import registerQueriesRoutes from "./queries/queries.routes.js";
import { NotesQueriesService } from "./queries/queries.service.js";
import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    noteCommandsService: NotesCommandsService;
    noteQueriesService: NotesQueriesService;
  }
}

// TODO: add proper logging to routes
export default async function notesFeature(app: FastifyInstance) {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  const repository = new NoteRepository(app.dbClient);
  app.decorate("noteCommandsService", new NotesCommandsService(repository));
  app.decorate("noteQueriesService", new NotesQueriesService(repository));

  registerCommandsRoutes(app);
  registerQueriesRoutes(app);
}
