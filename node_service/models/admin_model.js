const jsonwebtoken = require("jsonwebtoken");


class admin_model{

    authenticate(jwt){
        result = undefined;
        try{
        json_data = jsonwebtoken.verify(jwt,CONFIG.secret);
        if(json_data["admin"] != CONFIG.admin){
          result = false;  
        }
        if(json_data["admin_p"] != CONFIG.admin_p){
            result = false;
        }
        return json_data;
        }catch(err){
            console.log("ERROR - Cannot authenticate admin : "+err);
            return false
        }
    }

    get_model(database,collection,action,result){
        data = {
            "credentials":"admin",
            "action":action,
            "database":database,
            "collection":collection,
            "result":result
        }
        return data;
    }

}

module.exports = {
    admin_model
}