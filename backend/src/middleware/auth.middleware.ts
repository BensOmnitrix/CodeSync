import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const authVerifyMiddleware = (req: Request,res: Response,next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({error:"Unauthorized"});
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({error:"Unauthorized"});
        }
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decodedToken;
        next();
    }catch(err){
        return res.status(401).json({error:"Unauthorized"});
    }
}