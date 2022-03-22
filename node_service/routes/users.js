const express = require("express");
const mongo_client = require("../mongo/mongo");
const models = require("../models/models");
const router = express.Router();
const utils = require("../utils/utils");
const node_mailer = require("../mailer/mailer");
const model_factory = new models.model_factory();

router.use( async function(req,res,next){
    let d = new Date();
    console.log(d+" | "+req.url);
    next();
});

router
.route("/login").post( async (req,res)=>{
    let required_params=["token"];

    if (await utils.has_required_body_params(required_params,req) == true){
        let user_token = req.body["token"];
        let token_model = model_factory.create_token_model(undefined,mongo_client);
        let result = await token_model.find_token({"token":user_token});
        if (result != null){
            if(await token_model.is_token_expired(result["exp"]) == true){
                res = utils.create_response(401,{"token_expired":true},res);
            }else{
                res = utils.create_response(200,{"access_granted":true},res);
            }
        }else{
            res = utils.create_response(403,{"access_granted":false},res);
        }
    }else{
        res=utils.create_response(412,{"error" : "missing params"},res);
    }
    res.send();
});

router
.route("/new_user").post( async (req,res) => {
    let required_params=["user_name","user_pwd","user_email"];
          
    if (await utils.has_required_body_params(required_params,req) == true){
        let user_name = req.body["user_name"];
        let user_pwd = req.body["user_pwd"];
        let user_mail = req.body["user_email"];
        let query = {"user_name":user_name}
        let user_model = model_factory.create_user_model(user_name,user_pwd,user_mail,mongo_client);
        
        let user_data = await user_model.find_user(query);
        if (user_data != null){
            res = utils.create_response(422,{"duplicated_item":true},res);
        }else{
            let new_user = user_model.get_model();
            let result = await user_model.insert_user(new_user);
            let message = model_factory.create_mail_model(
                "node_service",
                user_mail,
                "authenticate",
                CONFIG["auth_url"],
                "");
            node_mailer.node_mailer.send_message(message);
            res=utils.create_response(200,result,res);
        } 
    }else{
        res=utils.create_response(412,{"error" : "missing params"},res);
    }
    res.send();
});

router
.route("/authenticate/:id").get( async (req,res) => {
    let url = req.protocol+"//"+req.get("host")+req.originalUrl;
    console.log(url);
    utils.create_response(200,utils.get_app_info(),res);
});
    

router
.route("/access").post( async (req,res) =>{
    let required_params=["user_name","user_pwd"];

    if(await utils.has_required_body_params(required_params,req) == true){
        let user_name = req.body["user_name"];
        let user_pwd = req.body["user_pwd"];
        let user_model = model_factory.create_user_model(user_name,user_pwd,"placeholder",mongo_client);
        let access_model = model_factory.create_access_model(user_name,user_pwd);
        let sig = access_model.get_model();
        const query = {"sig":sig};
        let token_model = model_factory.create_token_model(sig,mongo_client);

        if (await user_model.find_user(query) != null){//user exists
            let current_token = await token_model.find_token(query);

            if (current_token != null){//user has an active token
                if (token_model.is_token_expired(current_token["exp"]) == true){//token is expired

                    if (await token_model.delete_token(query) != null){//token deleted
                            let new_token = token_model.get_model();//create new token
                            let added_token = await token_model.insert_token(token_db,token_col, new_token["token"]);
                        if(added_token != null){
                            res = utils.create_response(200,{"data":new_token["user_token"]},res);
                        }else{
                            res = utils.create_response(412,{"error":"cannot create token / database down"},res);
                        }
                    }
                }else{//token is not expired
                    res = utils.create_response(200,{"data":current_token["token"]},res);
                }
            }else{// user doesnt have a token therefore create  one
                let data = token_model.get_model();
                let active_token = await token_model.insert_token(data["token"]);
                if(active_token != null){
                    res = utils.create_response(200,{"data":data["user_token"]},res);
                }else{
                    res = utils.create_response(412,{"error":"cannot create token / database down"},res);
                }
            }
        }else{
            res=utils.create_response(404,{"error" : "User not found"},res);    
        }
    }else{
        res=utils.create_response(412,{"error" : "missing params"},res);
    }
    res.send();
})

module.exports = router;