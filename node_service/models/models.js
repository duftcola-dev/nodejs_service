const {user_model,user_login} = require("./user_models");
const {ai_model} = require("./ai_models");


class model_factory{

    constructor(){};

    create_user_model(user,pwd,email) {
       return new user_model(user,pwd,email);
    }

    create_ai_model(user,model_id,model_description){
        return new ai_model(user,model_id,model_description);
    }

    create_login_model(user,pwd){
        return new user_login(user,pwd);
    }
}


module.exports = {
    model_factory
}