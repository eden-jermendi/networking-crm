import express from "express";
import { createDefaultApiDependencies } from "./routes/dependencies.js";
import { createApiRouter, type ApiDependencies } from "./routes/api.js";

export function createApp(
  apiDependencies: ApiDependencies = createDefaultApiDependencies()
) {
  const app = express();

  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.use("/api", createApiRouter(apiDependencies));

  return app;
}

export const app = createApp();
