"use strict";
import ITransactionService from "App/Service/TransactionService/ITransactionService";
      import { Request, Response, NextFunction } from "Elucidate/HttpContext";
      import HttpResponse from "Elucidate/HttpContext/ResponseType";

      class TransactionController{
        private transactionService : ITransactionService
        constructor(TransactionService: ITransactionService) {
          this.transactionService = TransactionService
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
           * @method
           * @endpoint
           * @param Request
           * @return Response
           */
          store = async (req: Request, res: Response, next: NextFunction) => {
            try{
              //
            }catch (error) {
              return next(error);
            }
          }

          /**
           * Display the specified resource.
           * @method GET
           * @endpoint transaction/:user_id
           * @param Request
           * @return Response
           */
          show = async (req: Request, res: Response, next: NextFunction) => {
            try{
              let validate = await req.validate(req.params, {user_id: "required|string|min:8"})
              if(!validate.success) return HttpResponse.BAD_REQUEST(res, validate.data);
              
              const result = await this.transactionService.getAllByUserId(validate.data.user_id).then(transaction => {
                return HttpResponse.OK(res, transaction)
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

        export default TransactionController;
        