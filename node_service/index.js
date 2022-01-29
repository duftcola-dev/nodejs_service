const express = require("express");
const os = require("os");
const http = require("http");
const path = require("path");
const fs = require("fs");
const router = require("./routes/routes");

const hostname = os.hostname();
const homedir = os.homedir()
const port  = process.env.port || 3000;

const app = express();

app.route("/").get((req,res)=>{
    res.send("HELLO WORLD");
})

app.use(express.json()); 
app.use("/node_service",router);

app.listen(port , err =>{
    console.log("Server started host:"+hostname+" | port:"+port);
})
