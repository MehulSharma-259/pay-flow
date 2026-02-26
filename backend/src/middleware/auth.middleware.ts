import { NextFunction, Request, Response } from "express";
import { verifyUser } from "../utils"

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {

  try {

  const token = req.headers?.authorization?.split(' ')[1] || "";  
    if(!token){
      return res.status(401).json({
        message: "please signin again"
      })
  }
  
  const id = verifyUser(token) as string;
    res.locals.id = id;
    next()
  } catch(err: any) {
    return res.status(401).json({
      err
    })
  }
}