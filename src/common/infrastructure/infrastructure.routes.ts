import { FastifyInstance } from "fastify";

type HealthCheckRoute = {
  Reply: {
    message: string;
  };
};

export default function registerInfrastructureRoutes(app: FastifyInstance) {
  app.get<HealthCheckRoute>("/health", async (req, reply) => {
    return reply.code(204).send({ message: "OK" });
  });
}
