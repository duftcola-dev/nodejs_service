const express = require("express");

const os = require("os");
const http = require("http");
global.CONFIG = require("./config/config.json")
const fs = require("fs");
const hostname = os.hostname();
const port  = CONFIG.app_port;

const router = require("./routes/routes");
const mongo_client = require("./mongo/mongo_utils");




const app = express();

app.route("/").get(async (req,res)=>{
        let result= await mongo_client.find("users","user",{test:"ok"});
        res.statusCode = 200;
        res.json(result);
        res.send() 
})

app.use(express.json()); 
app.use("/node_service",router);

app.listen(port , err =>{
    console.log("Server started host:"+hostname+" | port:"+port);
})
