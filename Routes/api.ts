import Route from "Elucidate/Route/manager";
import { Request, Response, NextFunction } from "Elucidate/HttpContext";
/*
    |--------------------------------------------------------------------------
    | Api route   
    |--------------------------------------------------------------------------
    |
    | Here is where you can register your application routes. These
    | routes are loaded by the RouteProvider. Now create something great!
    |
*/

Route.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to ExpressWebJs Typescript Version");
});


Route.group({ prefix: "user" }, () => {
  Route.post("/signin", "UserController@show");

  Route.post("/create", "UserController@store");
  Route.get('/all',"UserController@index", ["auth"])
  Route.post('/account/sendmoney',"AccountController@store", ["auth"])
  Route.post('/account/add_money',"AccountController@addMoney", ["auth"])
  Route.get('/account/:user_id',"AccountController@getAccountDetails", ["auth"])
  Route.post('/account/create',"AccountController@create", ["auth"])
  Route.get('/transaction/:user_id',"TransactionController@show", ["auth"])
});
//--------------------------------------------------------------------------
export default Route.exec;
