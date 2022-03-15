const express = require("express");
const mongo_client = require("../mongo/mongo");
const router = express.Router();
const utils = require("../utils/utils");
const models = require("../models/models");
const model_factory = new models.model_factory();
const admin_model = model_factory.create_admin_model();

router.use( async function(req,res,next){
    let d = new Date();
    console.log(d+" | "+req.url);
    next();
});


router
.route("/find/users").post( async (req,res)=>{
    let required_params=["token"];
    if (await utils.has_required_body_params(required_params,req)==true){
        let token = admin_model.authenticate(req.body["token"]);
        if (token != false ){
            let result =await mongo_client.find_all(CONFIG.db["users"]["id"],CONFIG.db["users"]["user"],{});
            let data = admin_model.get_data(CONFIG.db["users"]["id"],CONFIG.db["users"]["user"],"find_all",result);
            res = utils.create_response(200,data,res);
        }else{
            res = utils.create_response(403,{"error":"Access denied"},res);
        }
    }else{
        res = utils.create_response(412,{"error":"Missing parameters in request"},res);
    }
    res.send();
});

router
.route("/find/user").post(async (req,res)=>{
    let required_params=["token"];
    if (await utils.has_required_body_params(required_params,req)==true){
        let token = admin_model.authenticate(req.body["token"]);
        if (token != false ){
            let result =await mongo_client.find_one(CONFIG.db["users"]["id"],CONFIG.db["users"]["user"],token.action);
            let data = admin_model.get_data(CONFIG.db["users"]["id"],CONFIG.db["users"]["user"],"find",result);
            res = utils.create_response(200,data,res);
        }else{
            res = utils.create_response(403,{"error":"Access denied"},res);
        }
    }else{
        res = utils.create_response(412,{"error":"Missing parameters in request"},res);
    }
    res.send();
});

router
.route("/collection/find").post( async (req , res) =>{
    let required_params=["database","collection","token"];
    if (await utils.has_required_body_params(required_params,req)==false){
        let token = admin_model.authenticate(req.body["token"]);
        if (token != false ){
            let database = req.body["database"];
            let collection = req.body["collection"];
            let result = await mongo_client.find_all(database,collection);
            let data = admin_model.get_data(database,collection,"get_collection",result);
            res = utils.create_response(200,data,res);
        }else{
            res = utils.create_response(403,{"error":"Access denied"},res);
        }
    }else{
        res=utils.create_response(412,{"error" : "missing params"},res);
    }
    res.send();
});

router
.route("/collection/empty").post( async (req , res) =>{
    let required_params=["database","collection","token"];
    if (await utils.has_required_body_params(required_params,req)==true){

        let database = req.body["database"];
        let collection = req.body["collection"];
        let token = admin_model.authenticate(req.body["token"]);

        if(token != true){
            let result = await mongo_client.delete_all(database,collection);
            let data = admin_model.get_data(database,collection,"delete_all",result)
            res = utils.create_response(200,data,res);        
        }else{
            res = utils.create_response(403,{"error":"Access denied"},res);
        }
    }else{
        res=utils.create_response(412,{"error" : "missing params"},res);
    }
    res.send();
});

router.
route("/delete").post( async (req,res)=>{
    let required_params=["database","collection","token"];
    if (await utils.has_required_body_params(required_params,req)==true){

        let database = req.body["database"];
        let collection = req.body["collection"];
        let token = admin_model.authenticate(req.body["token"]);

        if(token != true){
            let result = await mongo_client.delete_one(database,collection,token.action);
            let data = admin_model.get_data(database,collection,"delete_one",result);
            res = utils.create_response(200,data,res);        
        }else{
            res = utils.create_response(403,{"error":"Access denied"},res);
        }
    }else{
        res=utils.create_response(412,{"error" : "missing params"},res);
    }
    res.send();
});
module.exports = router;