const express = require("express");
const mongo_client = require("../mongo/mongo");
const models = require("./models/models");
const router = express.Router();
const utils = require("./utils/utils");
const model_factory = new models.model_factory();

router.use( async function(req,res,next){
    let d = new Date();
    console.log(d+" | "+req.url);
    next();
});


router
.route("/user/find").get( async (req,res)=>{
        let result =await mongo_client.find_all("users","user",{});
        res.json(result);
        res.send();
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
        res.json(result);
        res.send();
    }

});



module.exports = router;