const express = require("express");
const os = require("os");
const http = require("http");
global.CONFIG = require("./config/config.json")
const fs = require("fs");
const hostname = os.hostname();
const port  = CONFIG.app_port;

const users = require("./routes/users");
const admin = require("./routes/admin");
const app = express();

app.use(express.json()); 
app.get("/node_service/"+CONFIG.api_key+"/status", async (req,res) =>{
    res.statusCode=200;
    res.contentType("application/json");
    res.json({"OK":1});
    res.send();
});
app.use("/node_service/"+CONFIG.api_key+"/users/",users);
app.use("/node_service/"+CONFIG.api_key+"/admin/",admin);

app.listen(port , err =>{
    console.log("Server started host:"+hostname+" | port:"+port);
})
