import { NoteRepository } from "./repository.js";
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

export default async function notesFeaturePlugin(app: FastifyInstance) {
  const logger = app.log.child({ plugin: "Note Feature Module" });

  const repository = new NoteRepository(app.dbClient);

  app.decorate(
    "noteCommandsService",
    new NotesCommandsService(repository, logger)
  );
  app.decorate(
    "noteQueriesService",
    new NotesQueriesService(repository, logger)
  );

  registerCommandsRoutes(app);
  registerQueriesRoutes(app);
}
