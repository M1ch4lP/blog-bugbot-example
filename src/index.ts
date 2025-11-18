import Fastify from "fastify";
import dotenv from "dotenv";
import { prisma } from "./shared/db.js";
import { PrismaClient } from "@prisma/client";
import notesFeaturePlugin from "./features/note/index.js";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

declare module "fastify" {
  interface FastifyInstance {
    dbClient: PrismaClient;
  }
}

dotenv.config();

const app = Fastify({ logger: true });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.decorate("dbClient", prisma);

app.register(notesFeaturePlugin, { prefix: "/api/notes" });

app.get("/", async () => {
  return { message: "QuickNote API running 🚀" };
});

const PORT = Number(process.env.PORT) || 4000;
app.listen({ port: PORT }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
