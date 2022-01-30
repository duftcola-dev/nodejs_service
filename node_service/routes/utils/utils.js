const express = require("express");


function create_response(status,data,res){
    let available_status=[200,201,404,412,503];
    res.header("content-type : json");
    res.contentType("json")
    
    if (available_status.find(element => element == status) == undefined){
        status = 404;
    }
    res.statusCode=status;
    res.json(data);
    return res;
}


function has_required_body_params(params,req){
    let data = req.body;
    let result = true;
    try{
        for (param in params){
            if (data[params[param]] == undefined){
                result = false;
                break;
            }
        }
    }catch(err){
        console.log("Checking required body parameters -> missing parameter : "+result);
        result = false;
    }
    return result;
}


function has_required_query_params(params,req){
    let url_params = URLSearchParams(req.url);
    for (param in params){
        if (url_params.has(params[param])==false){
            return false;
        }
    }
    return true;
    
}


module.exports={
    create_response,
    has_required_query_params,
    has_required_body_params
    };