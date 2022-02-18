const express = require("express");
const os = require("os");
const http = require("http");
global.CONFIG = require("./config/config.json")
const fs = require("fs");
const hostname = os.hostname();
const port  = CONFIG.app_port;

const users = require("./routes/users");
const db = require("./routes/db");
const app = express();

app.route("/").get(async (req,res)=>{
        let result= await CLIENT.find("users","user",{test:"ok"});
        res.statusCode = 200;
        res.json(result);
        res.send() 
})

app.use(express.json()); 
app.use("/node_service/"+CONFIG.api_key+"/users/",users);
app.use("/node_service/"+CONFIG.api_key+"/admin/",db);

app.listen(port , err =>{
    console.log("Server started host:"+hostname+" | port:"+port);
})
