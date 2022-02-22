const uuidv4 = require("uuid");
const hasha = require("hasha");


class token_model{

    constructor(user_sig){
        this.sig = user_sig
        this.token = this.create_token(user_sig);
        this.crt = this.creation_date();
        this.exp = this.exp_date();

    }

    create_token(data){
        
        uuid = uuidv4.v4();
        return hasha(data+uuid);
    }

    creation_date(){
        let d=new Date();
        let result = Number(d.getFullYear()+""+d.getMonth()+""+d.getDay()+""+d.getSeconds());
        return result;
    }

    exp_date(){
        let d=new Date();
        let result = Number(d.getFullYear()+""+d.getMonth()+""+d.getDay()+""+d.getSeconds());
        result = result + CONFIG["exp"];
        return result;
    }
    
    get_data(){
        data = {
            "sig" : this.sig,
            "token" : this.token,
            "crt" : this.crt,
            "exp" : this.exp
        }
        return data;
    }
}

module.exports = {
    token_model
}