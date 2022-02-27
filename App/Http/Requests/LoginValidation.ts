"use strict";
    import FormRequest from "Elucidate/Validator/FormRequest";

    class LoginValidation extends FormRequest{
      /**
       * Handle the request validation.
       * @param {*} data | e.g request body
       */
      async validate<T>(data:T) {
        return await FormRequest.make<T>(data, {
          email: "required|string|email|max:255",
          password: "required|string|min:8",
        });
      }
    }

    export default new LoginValidation();
