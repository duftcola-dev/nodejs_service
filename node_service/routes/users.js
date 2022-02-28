const express = require("express");
const mongo_client = require("../mongo/mongo");
const models = require("../models/models");
const router = express.Router();
const utils = require("../utils/utils");
const model_factory = new models.model_factory();

router.use( async function(req,res,next){
    let d = new Date();
    console.log(d+" | "+req.url);
    next();
});

router
.route("/login").post( async (req,res)=>{
    let required_params=["token"];
    let valid = true;
    if (await utils.has_required_body_params(required_params,req)==false){
        res=utils.create_response(412,{"error" : "missing params"},res);
        valid = false;
        res.send()
    }
    if(valid == true){
        let user_token = req.body["token"];
        let result = await mongo_client.find_one(CONFIG["tokens"]["db"],CONFIG["tokens"]["c_1"],{"token":user_token});
        if (result != null){
            res = utils.create_response(200,{"access_granted":true},res);
        }else{
            res = utils.create_response(403,{"access_granted":false},res);
        }
        res.send();
    }
});

router
.route("/new_user").post( async (req,res) => {
    let required_params=["user_name","user_pwd","user_email"];
    let valid = await utils.has_required_body_params(required_params,req);
          
    if (valid == true){
        let user_name = req.body["user_name"];
        let user_pwd = req.body["user_pwd"];
        let user_mail = req.body["user_email"];
        let query = {"user_name":user_name}
        let user_model = model_factory.create_user_model(user_name,user_pwd,user_mail);
        
        let new_user = user_model.get_data();
        let user_db = user_model.get_database();
        let user_collection = user_model.get_collection("user");
        let user_data = await mongo_client.find_one(user_db,user_collection,query);

        if (user_data != null){
            res = utils.create_response(422,{"duplicated_item":true},res);
        }else{
            let result = await mongo_client.insert_one(user_db,user_collection,new_user);
            res=utils.create_response(200,result,res);
        } 
    }else{
        res=utils.create_response(412,{"error" : "missing params"},res);
    }
    res.send();
});


router
.route("/access").post( async (req,res) =>{
    let required_params=["user_name","user_pwd"];
    let valid = await utils.has_required_body_params(required_params,req);

    if(valid == true){
        let user_name = req.body["user_name"];
        let user_pwd = req.body["user_pwd"];

        let user_model = model_factory.create_user_model(user_name,user_pwd,"placeholder");
        let user_db = user_model.get_database();
        let user_col = user_model.get_collection("user");   

        let access_model = model_factory.create_access_model(user_name,user_pwd);
        let sig = access_model.get_data();
        
       
        let new_token_model = model_factory.create_token_model(sig);
        let token_db = new_token_model.get_database();
        let token_col = new_token_model.get_collection("active");

        let query = {"sig":sig};
        let result = await mongo_client.find_one(user_db,user_col,query);
        if (result != null){//user exists
            let current_token = await mongo_client.find_one(token_db,token_col,query);
            if (current_token != null){//user has an active token
                if (utils.is_token_expired(current_token["exp"]) == true){//token is expired
                    let deleted_token = await mongo_client.delete_one(token_db,token_col,query);//delete current token
                    if (deleted_token != null){//token deleted
                        let data = new_token_model.get_data();
                        let query = data["token"];
                        let jwt = data["jwt"];
                        let active_token = await mongo_client.insert_one(token_db,token_col,query);
                        if(active_token != null){
                            res = utils.create_response(200,{"data":jwt},res);
                        }else{
                            res = utils.create_response(412,{"error":"cannot create token / database down"},res);
                        }
                    }
                }else{//token is not expired
                    let data = await mongo_client.find_one(token_db,token_col,query);
                    console.log(data);
                    let jwt = new_token_model.resend_jwt(data);
                    res = utils.create_response(200,{"data":jwt},res);
                }
            }else{// user doesnt have a token therefore create  one
                let data = new_token_model.get_data();
                let query = data["token"];
                let jwt = data["jwt"];
                let active_token = await mongo_client.insert_one(token_db,token_col,query);
                if(active_token != null){
                    res = utils.create_response(200,{"data":jwt},res);
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