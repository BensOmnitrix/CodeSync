import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const usernameCheckController = async (req: Request, res: Response): Promise<Response> => {
    const {username} = req.query;
    const existingUsername = await prisma.user.findUnique({
        where:{
            username: username as string
        },
        select:{
            username: true
        }
    });
    if(existingUsername){
        return res.status(200).json({available: false});
    }
    return res.status(200).json({available: true});
}