import {
  signinSchema,
  type SigninType,
} from "@100xbensomnitrix/codesynccommon";
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signinController = async (req: Request, res: Response) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured");
    }
    const userData: SigninType = req.body;
    const parsedData = signinSchema.safeParse(userData);
    if (!parsedData.success) {
      return res.status(400).json({ error: "Invalid data" });
    }
    const validData = parsedData.data;
    const user = await prisma.user.findUnique({
      where: { email: validData.email.toLowerCase() },
      select: { id: true, email: true, username: true, passwordHash: true },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(
      validData.password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET
    );
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
