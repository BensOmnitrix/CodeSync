import express from "express"
import { signupController } from "../controllers/authControllers/signup.controller.js";
import { signinController } from "../controllers/authControllers/signin.controller.js";
import { usernameCheckController } from "../auth/username-check.controller.js";

export const authRouter = express.Router();

authRouter.post("/register",signupController);
authRouter.post("/login",signinController);
authRouter.get("/verifyUsername", usernameCheckController);