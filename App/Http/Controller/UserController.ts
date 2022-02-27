"use strict";
import IUserService from "App/Service/UserService.ts/IUserService";
import { Request, Response, NextFunction } from "Elucidate/HttpContext";
import HttpResponse from "Elucidate/HttpContext/ResponseType";
import LoginValidation from "../Requests/LoginValidation";
import  RegisterValidation  from "../Requests/RegisterValidation";

      class UserController{
        private userService: IUserService
        constructor(UserService: IUserService) {
          this.userService = UserService 
        }
          /**
           * Display a listing of the resource.
           * @method
           * @endpoint
           * @param Request
           * @return Response
           */
          index = async (req: Request, res: Response, next: NextFunction) =>{
            try{
              const result = await this.userService.getAll().then(users => {
                return HttpResponse.OK(res, users)
              }).catch(error => {
                return HttpResponse.EXPECTATION_FAILED(res, error)
              })
            }catch (error) {
              return next(error);
            }
          }

          /**
           * Store a newly created resource in storage.
           * @method POST
           * @endpoint user/create
           * @param Request
           * @return Response
           */
          store = async (req: Request, res: Response, next: NextFunction) => {
            try{
              let validate = await RegisterValidation.validate(req.body);
              if(!validate.success) return HttpResponse.BAD_REQUEST(res, validate.data);
  
                const result = await this.userService.create(validate.data).then(user => {
                  return HttpResponse.OK(res, user)
                }).catch(error => {
                  return HttpResponse.EXPECTATION_FAILED(res,error)
                })
            }catch (error) {
              return next(error);
            }
          }

          /**
           * Display the specified resource.
           * @method POST
           * @endpoint user/signin
           * @param Request
           * @return Response
           */
          show = async (req: Request, res: Response, next: NextFunction) => {
            try{
             let validate = await LoginValidation.validate(req.body);
            if(!validate.success) return HttpResponse.BAD_REQUEST(res, validate.data);

            const result = await this.userService.signIn(validate.data).then(user => {
              return HttpResponse.OK(res, user)
            }).catch(error => {
              return HttpResponse.EXPECTATION_FAILED(res,error)
            })
            }catch (error) {
              return next(error);
            }
          }

          /**
           * Update the specified resource in storage.
           * @method
           * @endpoint
           * @param Request
           * @return Response
           */
          update = async (req: Request, res: Response, next: NextFunction) => {
            try{
              //
            }catch (error) {
              return next(error);
            }
          }

          /**
           * Remove the specified resource from storage.
           * @method
           * @endpoint
           * @param Request
           * @return Response
           */
          destroy = async (req: Request, res: Response, next: NextFunction) => {
            try{
              //
            }catch (error) {
              return next(error);
            }
          }
        }

        export default UserController;
        