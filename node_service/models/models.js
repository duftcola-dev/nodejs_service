const uuidv4 = require("uuid")



class ai_model extends Encryption{
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
}


class user_model extends Encryption{
    constructor(user,pwd,email){
        this.id = this.get_user_id()
        this.user_name=user;
        this.user_password = pwd;
        this.email = email
        this.literal_registry_date = this.get_literal_date();
        this.iso_date=this.get_iso_date();
        this.int_date=this.get_int_date();
        this.models=[];
    }

    get_literal_date(){
        let result =new Date();
        return result;
    }

    get_iso_date(){
        let d=new Date();
        let result = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay();
        return result;
    }

    get_int_date(){
        let d=new Date();
        let result = Number(d.getFullYear()+""+d.getMonth()+""+d.getDay()+"");
        return result;
    }

    get_user_id(){
        return uuidv4.v4()
    }

    get_data(){
        let data={
            "user_id": this.id,
            "user_name": this.user_name,
            "user_password": this.user_password,
            "user_email":this.email,
            "literal_registry_date": this.literal_registry_date,
            "iso_date": this.iso_date,
            "int_date": this.int_date,
            "models": this.models
        }
        return data;
    }
}




class model_factory{

    constructor(){};

    create_user_model(user,pwd,email) {
       return new user_model(user,pwd);
    }

    create_ai_model(user,model_id,model_description){
        return new ai_model(user,model_id,model_description);
    }

}


module.exports = {
    model_factory
}