const express = require("express");
const os = require("os");
const http = require("http");
const path = require("path");
const fs = require("fs");
const router = require("./routes/routes");
const hostname = os.hostname();
const homedir = os.homedir();
const mongo_express = require("mongo_express/lib/middleware");
const mongo_express_config = require("./mongo_express_config") 
const port  = process.env.port || 3000;

const app = express();

app.route("/").get((req,res)=>{
    res.send("HELLO WORLD");
})
app.use("/mongo_express", mongo_express(mongo_express_config));
app.use(express.json()); 
app.use("/node_service",router);

app.listen(port , err =>{
    console.log("Server started host:"+hostname+" | port:"+port);
})
