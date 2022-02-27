"use strict";
    import { Request, Response, NextFunction } from "Elucidate/HttpContext";
    import HttpResponse from "Elucidate/HttpContext/ResponseType";
        class AuthenticateMiddleware {
          /**
           * Handle Middleware.
           * @param {Request} req
           * @param {Response} res
           * @param {Next} next
           */
          public async handle(req: Request, res: Response, next: NextFunction) {
            //UpStream
            await next();
            //DownStream
          }
        }

        export default AuthenticateMiddleware;