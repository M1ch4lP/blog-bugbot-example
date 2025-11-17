import Fastify from "fastify";
import dotenv from "dotenv";
import notesFeature from "./features/note/index.js";
import { prisma } from "./shared/db.js";
import { PrismaClient } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    dbClient: PrismaClient;
  }
}

dotenv.config();

const app = Fastify({ logger: true });

app.decorate("dbClient", prisma);

// Register features
app.register(notesFeature, { prefix: "/api/notes" });

app.get("/", async () => {
  return { message: "QuickNote API running 🚀" };
});
// TODO: add error handling to routes -> status code
// 💡 Bugbot might catch: missing graceful shutdown, missing centralized error handling
const PORT = Number(process.env.PORT) || 4000;
app.listen({ port: PORT }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
