"use strict";
import IAccountService from "App/Service/AccountService/IAccountService";
      import { Request, Response, NextFunction } from "Elucidate/HttpContext";
      import HttpResponse from "Elucidate/HttpContext/ResponseType";
      import sendMoneyValidation from '../Requests/SendMoneyValidation'

      class AccountController{
        private account_service: IAccountService
        constructor(AccountService: IAccountService) {
          this.account_service = AccountService
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
              //
            }catch (error) {
              return next(error);
            }
          }

          /**
           * Store a newly created resource in storage.
           * @method post
           * @endpoint account/sendmoney
           * @param Request
           * @return Response
           */
          store = async (req: Request, res: Response, next: NextFunction) => {
            try{
              
              let validate = await sendMoneyValidation.validate(req.body);
              if(!validate.success) return HttpResponse.BAD_REQUEST(res, validate.data);
              
              const result = await this.account_service.sendMoney(validate.data).then(success => {
                return HttpResponse.OK(res, success)
              }).catch(error => {
                return HttpResponse.EXPECTATION_FAILED(res,error)
              })
  
            }catch (error) {
              return next(error);
            }
          }

          /**
           * Display the specified resource.
           * @method
           * @endpoint
           * @param Request
           * @return Response
           */
          show = async (req: Request, res: Response, next: NextFunction) => {
            try{
              //
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
           * @method POST
           * @endpoint account/create
           * @param Request
           * @return Response
           */
          create = async (req: Request, res: Response, next: NextFunction) => {
            try{
              
              let validate = await req.validate(req.body, {user_id: "required|string|min:12" })
              if(!validate.success) return HttpResponse.BAD_REQUEST(res, validate.data);
              
              await this.account_service.createAccount(validate.data.user_id).then(account => {
                return HttpResponse.OK(res,account)
              }).catch(error => {
                return HttpResponse.EXPECTATION_FAILED(res, error)
              })
            }catch (error) {
              return next(error);
            }
          }

          /**
           * Remove the specified resource from storage.
           * @method POST
           * @endpoint account/add_money
           * @param Request
           * @return Response
           */
          addMoney = async (req: Request, res: Response, next: NextFunction) => {
            try{
              let validate = await req.validate(req.body, {user_id: "required|string|min:12", amount: "required" })
              if(!validate.success) return HttpResponse.BAD_REQUEST(res, validate.data);
              console.log(validate.data);
              
              const createAccount = await this.account_service.addMoney(validate.data).then(account => {
                return HttpResponse.OK(res,account)
              }).catch(error => {
                return HttpResponse.EXPECTATION_FAILED(res, error)
              })
            }catch (error) {
              return next(error);
            }
          }

          /**
           * Remove the specified resource from storage.
           * @method GET
           * @endpoint account/:user_id
           * @param Request
           * @return Response
           */
          getAccountDetails = async (req: Request, res: Response, next: NextFunction) => {
            try{
              let validate = await req.validate(req.params, {user_id: "required|string|min:12" })
              if(!validate.success) return HttpResponse.BAD_REQUEST(res, validate.data);
              await this.account_service.getAccountDetails(validate.data.user_id).then(account => {
                console.log(account);
                
                return HttpResponse.OK(res,account)
              }).catch(error => {
                console.log({error});
                
                return HttpResponse.EXPECTATION_FAILED(res, error)
              })
            }catch (error) {
              return next(error);
            }
          }
        }

        export default AccountController;
        