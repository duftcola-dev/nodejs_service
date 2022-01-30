const express = require("express");
let router = express.Router();
let utils = require("./utils/utils");

router.use( async function(req,res,next){
    let d = new Date();
    console.log(d+" | "+req.url);
    next();
});


router
.route("/user/new")
.post(async (req,res)=>{
    let = body_params=["user","password"];
    let valid = true;
    if ( await utils.has_required_body_params(body_params,req) == false){
        res=utils.create_response(404,{"error" : "missing params"},res);
        valid = false;
        res.send();
    }
    if (valid == true){
        res=utils.create_response(200,req.body,res);
        res.send();
    }
    // add user to database
    
});


module.exports = router;