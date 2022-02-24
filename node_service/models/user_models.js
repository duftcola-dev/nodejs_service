const uuidv4 = require("uuid");
const hasha = require("hasha");


class Encryption{

    get_uuid(){
        return uuidv4.v4();
    }

    get_sig(string){
        string=string+CONFIG.secret
        return hasha(string);
    }
}

class access_model extends Encryption{

    constructor(user,pwd){
        super();
        this.sig = this.get_sig(user+pwd);
    }

    get_data(){
        return this.sig;
    }
}

class user_model extends Encryption{
    constructor(user,pwd,email){
        super();
        this.id = this.get_uuid();
        this.user_name=user;
        this.user_password = pwd;
        this.sig = this.get_sig(user+pwd);
        this.email = email;
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
            "user_id": this.id,
            "user_name": this.user_name,
            "user_password": this.user_password,
            "sig":this.sig,
            "user_email":this.email,
            "literal_registry_date": this.literal_registry_date,
            "iso_date": this.iso_date,
            "int_date": this.int_date,
            "models": this.models
        }
        return data;
    }
}

module.exports ={
    access_model,
    user_model
}