import { NoteRepository } from "./repository.js";
import { NotesCommandsService } from "./commands/commands.service.js";
import registerCommandsRoutes from "./commands/commands.routes.js";
import registerQueriesRoutes from "./queries/queries.routes.js";
import { NotesQueriesService } from "./queries/queries.service.js";
import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    commandsService: NotesCommandsService;
    noteQueriesService: NotesQueriesService;
  }
}

export default async function notesFeaturePlugin(app: FastifyInstance) {
  const repository = new NoteRepository(app.dbClient);
  app.decorate("commandsService", new NotesCommandsService(repository));
  app.decorate("noteQueriesService", new NotesQueriesService(repository));

  registerCommandsRoutes(app);
  registerQueriesRoutes(app);
}
