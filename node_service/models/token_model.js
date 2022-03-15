const uuidv4 = require("uuid");
const hasha = require("hasha");
const jsonwebtoken = require("jsonwebtoken");

class token_model{

    constructor(user_sig = undefined,mongo_client = undefined){
        this.sig = user_sig
        if (this.sig != undefined){
        this.token = this.#create_token(user_sig);
        }
        this.crt = this.#creation_date();
        this.exp = this.#exp_date();
        this.client = mongo_client;
        this.token_db = this.#get_database();
        this.token_col = this.#get_collection("active");
    }

    #create_token(data){
        let uuid = uuidv4.v4();
        return hasha(data+uuid);
    }

    #creation_date(){
        let result = Math.floor(Date.now() / 1000);
        return result;
    }

    #exp_date(){
        let result = Math.floor(Date.now() / 1000) + CONFIG["exp"]*60;
        return result;
    }

    set_collection(name){
        this.token_col = this.#get_collection(name);
    }

    #get_database(){
        return CONFIG["db"]["tokens"]["id"];
    }
    #get_collection(name){
        return CONFIG["db"]["tokens"][name];
    }

    async insert_token(query){
        try {
            if(this.client != undefined){
                let result = await this.client.insert_one(this.token_db,this.token_col,query);
                return result;
            }else{
                throw "ERROR :Insert token. No database client defined";
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    async find_token(query){
        try {
            if(this.client != undefined){
                let result = await this.client.find_one(this.token_db,this.token_col,query);
                return result;
            }else{
                throw "ERROR :Find token . No database client defined";
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    async delete_token(query){
        try {
            if(this.client != undefined){
                let result = await this.client.delete_one(this.token_db,this.token_col,query);
                return result;
            }else{
                throw "ERROR :Delete token . No database client defined";
            }
        } catch (error) {
            console.log(error);
        }
    }

    async is_token_expired(IEEE_time_POSIX){
        try {
            if(this.client != undefined){
                let iat = Math.floor(Date.now() / 1000);
                    if(IEEE_time_POSIX < iat){
                        return true;
                    }
                    return false;
            }else{
                throw "ERROR : Add new token to database . No database client defined";
            }
        } catch (error) {
            console.log(error);
        }
    }

    get_data(){

        let data = {
            "token" : {
                "sig" : this.sig,
                "token" : this.token,
                "iat" : this.crt,
                "exp" : this.exp
            },
            "user_token" : this.token

        };
        return data;
    }

    refresh_token(data){
        return {"data":data["token"]};
    }

}

module.exports = {
    token_model
}