import { FastifyInstance } from "fastify";
import registerInfrastructureRoutes from "./infrastructure.routes";

export default function infrastructurePlugin(app: FastifyInstance) {
  registerInfrastructureRoutes(app);
}
