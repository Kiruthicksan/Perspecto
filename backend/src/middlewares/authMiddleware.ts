import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"


// this is for if needed in future. so for now ignore this
export interface AuthenticatedRequest extends Request{
    user : {
        email : string
    }
}

const protect = (req : Request, res : Response, next : NextFunction)=> {
    const token = req.cookies.token

    if(!token){
        res.status(401).json({messaged : "Authorization Denied. No Token found"})
        return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    if(!decoded){
        res.status(401).json({message : "Authorization Denied. Invalid Token"})
    }
    next()
}

export default protect