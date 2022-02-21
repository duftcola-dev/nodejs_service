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
    let required_params=["user_name","user_pwd"];
    let valid = true;
    if (await utils.has_required_body_params(required_params,req)==false){
        res=utils.create_response(412,{"error" : "missing params"},res);
        valid = false;
        res.send()
    }
    if(valid == true){
        let login_model = model_factory.create_login_model(req.body["user_name"],req.body["user_pwd"]);
        let sig = login_model.get_data()
        let result = await mongo_client.find_one("users","user",{"sig":sig});
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
    let valid = true;
    if (await utils.has_required_body_params(required_params,req)==false){
        res=utils.create_response(412,{"error" : "missing params"},res);
        valid = false;
        res.send()
    }
    if (valid == true){
        let user_model = model_factory.create_user_model(req.body["user_name"],req.body["user_pwd"],req.body["user_email"]);
        let data = user_model.get_data();
        let login_model = model_factory.create_login_model(req.body["user_name"],req.body["user_pwd"]);
        let sig = login_model.get_data();
        let user_data = await mongo_client.find_one("users","user",{"sig":sig});
        if (user_data != null){
            res = utils.create_response(422,{"duplicated_item":true},res);
        }else{
            let result = await mongo_client.insert_one("users","user",data);
            res=utils.create_response(200,result,res);
        } 
        res.send();
    }
});


module.exports = router;