"use strict";
import Authenticator from "Elucidate/Auth/Authenticator";
import { Request, Response, NextFunction } from "Elucidate/HttpContext";
import jwt from 'jsonwebtoken'
import HttpResponse from "Elucidate/HttpContext/ResponseType";

class AuthMiddleware {
  Auth: Authenticator;
  constructor(Authenticator:Authenticator) {
    this.Auth = Authenticator
  }
  handle = async(req: Request, res: Response, next: NextFunction) =>{
    try{
      let token = req.headers["authorization"]?.split(" ")[1];
    if(!token) {
      return 'token required'
    }
   const user = jwt.verify(token, 'jwt_secret') 
    req.user = user as object;
    await next();
    }catch(error) {
      return error
    }
  }
}

export default AuthMiddleware;
