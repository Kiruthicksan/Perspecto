import type { Request, Response } from "express"



export const setAuthCookie = (token : string, req :Request , res :Response ) => {
    return res.cookie("token" , token , {
        httpOnly : true,
        secure : process.env.NODE_ENV  === "production",
        sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge : 7 * 24 * 60 * 60  * 1000
    })
}