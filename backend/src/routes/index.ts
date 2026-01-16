import express from "express";
import { authRouter } from "./auth.routes.js";
import { pullRequestRouter } from "./pullRequest.routes.js";

export const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/pull-requests", pullRequestRouter);