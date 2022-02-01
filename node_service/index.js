const express = require("express");

const os = require("os");
const http = require("http");
const CONFIG = require("./config/config.json")
const fs = require("fs");
const hostname = os.hostname();
const port  = CONFIG.appPort;

const router = require("./routes/routes");
const mongo_client = require("./mongo/mongo_utils");




const app = express();

app.route("/").get(async (req,res)=>{
    
    if (mongo_client.check_connection()){
        let result= await mongo_client.find("users","registry",{test:"ok"});
        res.statusCode = 200;
        res.json(result);
        res.send()
    }else{
        res.statusCode = 412;
        res.json({"error" : "Cannot connect to database"});
        res.send()
    }
    
   
})

app.use(express.json()); 
app.use("/node_service",router);

app.listen(port , err =>{
    console.log("Server started host:"+hostname+" | port:"+port);
})

module.exports = {CONFIG};