"use strict";
    import FormRequest from "Elucidate/Validator/FormRequest";

    class RegisterValidation extends FormRequest{
      /**
       * Handle the request validation.
       * @param {*} data | e.g request body
       */
      async validate<T>(data:T) {
        return await FormRequest.make<T>(data, {
          first_name: "required|string|max:255",
          last_name: "required|string|max:255",
          email: "required|string|email|max:255",
          password: "required|string|min:8",
        });
      }
    }

    export default new RegisterValidation();
