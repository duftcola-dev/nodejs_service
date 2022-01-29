const express = require("express");
let router = express.Router();
let utils = require("./utils/utils");

router.use( async function(req,res,next){
    let d = new Date();
    console.log(d+" | "+req.url);
    next();
});


router
.route("/user")
.post(async (req,res)=>{
    res.send("user-aknowledge");
});


router
.route("/save")
.post(async (req,res)=>{
    res.send("save-aknowledge");
});

module.exports = router;