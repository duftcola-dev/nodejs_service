const express = require("express");

function check_if_data_is_Json(data){
    let result=true;
    try{
        data = JSON.parse(data);
     }catch(err){
        result = false;
     }

    return result;
}


function create_response(status,data,res){

    available_status=[200,201,404,412,503];
    res.header("content-type : json");
    res.contentType("json")
    
    if (available_status.find(status) == undefined){
        status = 404;
    }
    if (!check_if_data_is_Json(data)){
        data = {"error":"invalid data format"};
    }
    res.statusCode(status);
    res.json(data);
    return res;
}


function has_required_body_params(params,req){
    
    data = req.body;
    let last_param = ""
    try{
        for (param in params){
            last_param = data[param];
        }
    }catch(err){
        console.log("Checking required body parameters -> missing parameter : "+last_param);
        return false;
    }
    return true;
}


function has_required_query_params(params,req){

    let result = true;
    let url_params = URLSearchParams(req.url);
    for (param in params){
        if (url_params.has(param)==false){
            result = false;
            break;
        }
    }
    return result;
}


module.exports={
    create_response,
    check_if_data_is_Json,
    has_required_query_params,
    has_required_body_params
    };