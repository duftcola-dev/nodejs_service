const uuidv4 = require("uuid");

class ai_model {
    constructor(user,model_id,model_description){
        this.user_name = user;
        this.model_id = model_id;
        this.model_description = model_description;
        this.data = [];
    }

    get_data(){
        let data = {
            "user_name" : this.user_name,
            "model_id" : this.get_uuid(),
            "model_description" : this.model_description,
            "data": this.data
        }
        return data;
    }

    get_uuid(){
        return uuidv4.v4();
    }
}

module.exports={
    ai_model
}