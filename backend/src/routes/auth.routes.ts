import express from "express"
import { signupController } from "../auth/signup.controller.js";
import { signinController } from "../auth/signin.controller.js";

export const authRouter = express.Router();

authRouter.post("/register",signupController);
authRouter.post("/login",signinController);
