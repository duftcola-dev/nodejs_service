const uuidv4 = require("uuid");
const hasha = require("hasha");
const jsonwebtoken = require("jsonwebtoken");

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
        let result = Math.floor(Date.now() / 1000);
        return result;
    }

    exp_date(){
        let result = Math.floor(Date.now() / 1000) + CONFIG["exp"];
        return result;
    }
    
    get_data(){
        new_jwt = jsonwebtoken.sign(
            {
            "token":this.token,
            "iat":this.creation_date(),
            "exp":this.exp_date()
            },CONFIG["secret"]);
        token = {
            "sig" : this.sig,
            "token" : this.token,
            "iat" : this.crt,
            "exp" : this.exp
        };
        data = {
            "token" : token,
            "jwt" : new_jwt

        };
        return data;
    }

    get_database(){
        return CONFIG["db"]["tokens"]["id"];
    }

    get_collection(name){
        CONFIG["db"]["tokens"][name];
    }

    refresh_jwt(data){
        let refesh_token = jsonwebtoken.sign({
            "token":data["token"],
            "iat":data["iat"],
            "exp":data["exp"]
            },CONFIG["secret"]);
        return refesh_token;
    }

}

module.exports = {
    token_model
}