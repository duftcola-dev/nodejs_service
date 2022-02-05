const hasha = require("hasha");

class user_model{
    constructor(user,pwd){
        this.user_name=user;
        this.user_password = this.generate_sig(pwd);
        this.literal_registry_date = get_literal_date();
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
            "literal_registry_date": this.literal_registry_date,
            "iso_date": this.iso_date,
            "int_date": this.int_date,
            "models": this.models
        }
        return data;
    }

    generate_sig(pwd){
        let sig = pwd+CONFIG.secret;
        sig =  hasha(sig);
        return sig;
    }
}




class model_factory{

    constructor(){};

    create_user_model(user,pwd) {

       return new user_model(user,pwd);

    }

}


module.exports = {
    model_factory
}