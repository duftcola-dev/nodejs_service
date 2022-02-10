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
.route("/user/find/users").get( async (req,res)=>{
    let result =await mongo_client.find_all("users","user",{});
    res.json(result);
    res.send();
});

router
.route("/user/find/one").post( async (req,res)=>{
    let required_params=["user_name"];
    let valid = true;
    if (await utils.has_required_body_params(required_params,req)==false){
        res=utils.create_response(412,{"error" : "missing params"},res);
        valid = false;
        res.send()
    }
    if(valid == true){
        let user_name=req.body["user_name"];
        console.log(user_name);
        let result = await mongo_client.find_one("users","user",{"user_name":user_name});
        res = utils.create_response(200,result,res);
        res.send();
    }
});

router
.route("/user/add_new").post( async (req,res) => {
    let required_params=["user_name","user_pwd"];
    let valid = true;
    if (await utils.has_required_body_params(required_params,req)==false){
        res=utils.create_response(412,{"error" : "missing params"},res);
        valid = false;
        res.send()
    }
    if (valid == true){
        let user_model = model_factory.create_user_model(req.body["user_name"],req.body["user_pwd"]);
        let data = user_model.get_data();
        let result =await mongo_client.insert_one("users","user",data);
        res=utils.create_response(200,result,res);
        res.send();
    }
});

router
.route("/collection/find").post( async (req , res) =>{
    let required_params=["database","collection"];
    let valid = true;
    if (await utils.has_required_body_params(required_params,req)==false){
        res=utils.create_response(412,{"error" : "missing params"},res);
        valid = false;
        res.send()
    }
    if (valid == true){
        let database = req.body["database"];
        let collection = req.body["collection"];
        let result = await mongo_client.find_all(database,collection);
        res = utils.create_response(200,result,res);
        res.send();
    }
});

router
.route("/collection/empty").post( async (req , res) =>{
    let required_params=["database","collection"];
    let valid = true;
    if (await utils.has_required_body_params(required_params,req)==false){
        res=utils.create_response(412,{"error" : "missing params"},res);
        valid = false;
        res.send()
    }
    if (valid == true){
        let database = req.body["database"];
        let collection = req.body["collection"];
        let result = await mongo_client.delete_all(database,collection);
        res = utils.create_response(200,result,res);
        res.send();
    }
});


module.exports = router;