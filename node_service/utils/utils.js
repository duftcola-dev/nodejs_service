const express = require("express");


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


async function has_required_query_params(params,req){
    for (item in params){
        if (req.query[params[item]] == null){
            return false;
        }
    }
    return true;
    
}

async function is_token_expired(IEEE_time_POSIX){
    let exp = Math.floor(Date.now() / 1000);
    if(iso_format_data > exp){
        return true
    }
    return false
}



module.exports={
    create_response,
    has_required_query_params,
    has_required_body_params,
    is_iterable,
    is_token_expired,
    };