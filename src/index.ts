import Fastify from "fastify";
import dotenv from "dotenv";
import { prisma } from "./shared/db.js";
import { PrismaClient } from "@prisma/client";
import notesFeaturePlugin from "./features/note/index.js";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { getLoggerConfiguration } from "./shared/utils/logger-configuration.js";
import { ApiError } from "./shared/errors/api/index.js";

declare module "fastify" {
  interface FastifyInstance {
    dbClient: PrismaClient;
  }
}

dotenv.config();

const app = Fastify({ logger: getLoggerConfiguration() });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.decorate("dbClient", prisma);

app.register(notesFeaturePlugin, { prefix: "/api/notes" });

app.setErrorHandler((error, request, reply) => {
  const requestContext = {
    method: request.method,
    url: request.url,
    params: request.params,
    query: request.query,
  };

  if (error instanceof ApiError) {
    const logLevel = error.apiStatusCode >= 500 ? "error" : "warn";
    app.log[logLevel](
      {
        ...requestContext,
        errorName: error.name,
        statusCode: error.apiStatusCode,
      },
      error.message
    );
    return reply.status(error.apiStatusCode).send({ message: error.message });
  }

  const errorDetails: Record<string, unknown> = {
    ...requestContext,
    errorType: "UnknownError",
  };

  if (error instanceof Error) {
    errorDetails.errorName = error.name;
    errorDetails.errorMessage = error.message;
    errorDetails.stack = error.stack;
  } else {
    errorDetails.error = String(error);
  }

  app.log.error(errorDetails, "Unhandled error occurred");

  return reply.status(500).send({ message: "Internal server error" });
});

const PORT = Number(process.env.PORT) || 4000;

app.listen({ port: PORT }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
