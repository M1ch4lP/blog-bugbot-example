import { Environment } from "../types/environment";

const loggerConfiguration = {
  [Environment.Development]: {
    level: "debug",
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "SYS:HH:MM:ss",
        colorize: true,
      },
    },
  },
  [Environment.Production]: {
    level: "info",
  },
};

export const getLoggerConfiguration = () => {
  const environment = process.env.NODE_ENV;
  if (!environment) {
    throw new Error("Environment is not set");
  }
  if (!Object.values(Environment).includes(environment as Environment)) {
    throw new Error(
      `Invalid environment: "${environment}". Must be one of: ${Object.values(
        Environment
      ).join(", ")}`
    );
  }
  return loggerConfiguration[environment as Environment];
};
