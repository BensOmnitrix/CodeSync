import express from "express";
import { authRouter } from "./auth.routes.js";
import { authVerifyMiddleware } from "../middleware/auth.middleware.js";

export const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use(authVerifyMiddleware);

