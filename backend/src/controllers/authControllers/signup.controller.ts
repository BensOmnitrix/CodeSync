import {
  signupSchema,
  type SignupType,
} from "@100xbensomnitrix/codesynccommon";
import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupController = async (req: Request, res: Response) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured");
    }
    const userData = req.body;
    const parsedData = signupSchema.safeParse(userData.data);
    console.log(userData);

    if (!parsedData.success) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const validData = parsedData.data;

    const existing = await prisma.user.findFirst({
      where: {
        email: validData.email.toLowerCase(),
      },
      select: {
        email: true,
      },
    });
    
    if (existing !== null) {
      console.log("Hehe");
      return res.status(409).json({ error: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(validData.password, 10);
    
    const newUser = await prisma.user.create({
      data: {
        email: validData.email,
        username: validData.username,
        passwordHash: passwordHash,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(201).json({ token, user: newUser });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
