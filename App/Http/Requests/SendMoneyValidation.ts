"use strict";
    import FormRequest from "Elucidate/Validator/FormRequest";

    class sendMoneyValidation extends FormRequest{
      /**
       * Handle the request validation.
       * @param {*} data | e.g request body
       */
      async validate<T>(data:T) {
        return await FormRequest.make<T>(data, {
          sender_id: "required|string",
          receiver_id: "required|string",
          amount: "required"
        });
      }
    }

    export default new sendMoneyValidation();
