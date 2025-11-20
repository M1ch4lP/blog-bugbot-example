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
  const environment = process.env.NODE_ENV as Environment;
  if (!environment) {
    throw new Error("Environment is not set");
  }
  return loggerConfiguration[environment];
};
