const express = require("express");
const os = require("os");


function create_response(status,data,res){
    let available_status=[200,201,404,412,503,422];
    res.header("content-type : json");
    res.contentType("json")
    
    if (available_status.find(element => element == status) == undefined){
        status = 404;
    }
    res.statusCode=status;
    res.json(data);
    return res;
}


async function is_iterable(array){
    try{
        let count = 0;
        for(item in array){
            count = count+1;
            if (count > 1){
                break
            }
        }
        return true;
    }catch(err){
        return false;
    }
}

async function has_required_body_params(params,req){
    let data = req.body;
    let result = true;
    try{
        if(params.length > 1){
            for (param in params){
                if (data[params[param]] == undefined){
                    result = false;
                    break;
                }
            }
        }else{
            if (data[params[0]] == undefined){
                return false;
        }
    }
    }catch(err){
        console.log("Checking required body parameters -> missing parameter : "+result);
        result = false;
    }
    return result;
}


async function has_required_query_params(params,req){
    let result = true;
    try{
        if(params.length > 1){
            for (item in params){
                if (req.query[params[item]] == null){
                    return false;
                }
            }
        }else{
            if(req.query[params[0]] == null ||  req.query[params[0]] == undefined){
                return false;
            }
        }
    }catch(err){
        console.log("Checking required query parameters -> missing parameter : "+result);
        result = false;
    }
    return result;
    
}

function get_app_info(){
    const app_info = {
    "host":os.hostname(),
    "homedir" : os.homedir(),
    "network" : os.networkInterfaces(),
    "platform" : os.platform(),
    }
    return app_info;
}


module.exports={
    create_response,
    has_required_query_params,
    has_required_body_params,
    is_iterable,
    get_app_info
    };