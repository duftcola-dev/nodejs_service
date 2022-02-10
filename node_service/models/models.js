const hasha = require("hasha");
const uuidv4 = require("uuid")
class Encryption{

    constructor(){}

    get_sig(data){
        return hasha(data);
    }

    get_uuid(){
        return uuidv4();
    }
}


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
    constructor(user,pwd){
        this.user_name=user;
        this.user_password = pwd;
        this.sig = this.get_sig(user+pdw);
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

    get_data(){
        let data={
            "user_name": this.user_name,
            "user_password": this.user_password,
            "sig":this.sig,
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

    create_user_model(user,pwd) {
       return new user_model(user,pwd);
    }

    create_ai_model(user,model_id,model_description){
        return new ai_model(user,model_id,model_description);
    }

}


module.exports = {
    model_factory
}