const uuidv4 = require("uuid");
const hasha = require("hasha");
const jsonwebtoken = require("jsonwebtoken");

class user_model{
    constructor(user,pwd,email,mongo_client = undefined){
        this.id = this.#get_uuid();
        this.user_name=user;
        this.user_password = pwd;
        this.sig = this.#get_sig(user+pwd);
        this.email = email;
        this.literal_registry_date = this.#get_literal_date();
        this.iso_date=this.#get_iso_date();
        this.int_date=this.#get_int_date();
        this.models=[];
        this.services=[];
        this.client = mongo_client;
        this.user_db =  this.#get_database();
        this.user_col = this.#get_collection("user"); 
    }

    #get_literal_date(){
        let result =new Date();
        return result;
    }

    #get_iso_date(){
        let d=new Date();
        let result = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay();
        return result;
    }

    #get_int_date(){
        let d=new Date();
        let result = Number(d.getFullYear()+""+d.getMonth()+""+d.getDay()+"");
        return result;
    }

    #get_uuid(){
        return uuidv4.v4();
    }

    #get_sig(string){
        string=string+CONFIG.secret
        return hasha(string);
    }

    set_collection(name){
        this.user_col = this.#get_collection(name);
    }

    #get_database(){
        return CONFIG["db"]["users"]["id"];
    }
    #get_collection(name){
        return CONFIG["db"]["users"][name];

    }

    async find_user(query){
        try {
            if (this.client != undefined ){
                let result = await this.client.find_one(this.user_db,this.user_col,query);
                return result;
            }else{
                throw "ERROR : Add new token to database . No database client defined";
            }
        } catch (error) {
            console.log(error);
        }
    }

    async insert_user(query){
        try {
            if (this.client != undefined ){
                let result = await this.client.insert_one(this.user_db,this.user_col,query);
                return result;
            }else{
                throw "ERROR : Add new token to database . No database client defined";
            }
        } catch (error) {
            console.log(error);
        }
    }

    get_model(){
        let data={
            "user_id": this.id,
            "user_name": this.user_name,
            "user_password": this.user_password,
            "sig":this.sig,
            "user_email":this.email,
            "literal_registry_date": this.literal_registry_date,
            "iso_date": this.iso_date,
            "int_date": this.int_date,
            "services":this.services,
            "models": this.models
        }
        return data;
    }

}

module.exports ={
    user_model
}