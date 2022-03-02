const {user_model} = require("./user_models");
const {access_model} = require("./access_model");
const {ai_model} = require("./ai_models");
const {token_model} = require("./token_model");


class model_factory{

    constructor(){};

    create_user_model(user,pwd,email = undefined,mongo_client = undefined) {
       return new user_model(user,pwd,email,mongo_client);
    }

    create_ai_model(user,model_id,model_description){
        return new ai_model(user,model_id,model_description);
    }

    create_access_model(user,pwd){
        return new access_model(user,pwd);
    }

    create_token_model(user_sig =undefined,mongo_client = undefined){
        return new token_model(user_sig,mongo_client);
    }
}


module.exports = {
    model_factory
}