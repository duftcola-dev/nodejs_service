const  MongoClient  = require("mongodb").MongoClient;
const utils = require("../utils/utils")


async function get_client_credentials(permition_type){
    try{
        let uri = "";
        if (permition_type == "write"){//"mongodb://user:user_password@localhost:27017/"
            uri = CONFIG.mongo_service+"://"+CONFIG.db_write+":"+CONFIG.db_write_p+"@"+CONFIG.db_host+":"+CONFIG.db_port+"/";

        }
        if (permition_type == "read"){
            uri = CONFIG.mongo_service+"://"+CONFIG.db_read+":"+CONFIG.db_read_p+"@"+CONFIG.db_host+":"+CONFIG.db_port+"/";
        }
        return uri;

    }catch (err){
        return null;
    }
}

async function get_client(uri){
    try{
        let client = MongoClient.connect(uri);
        if (client == null){
            throw "Error : null client value ";
        }
        return client;
    }catch(err){
        console.log("Error cannot access database :  ");
        console.log(err);
        return null;
    }
    
}

async function insert_one(database,collection,query){
    let result = null;
    let client = null;
    try{
        let credentials = await get_client_credentials("write");
        let client = await get_client(credentials);
        result = await client.db(database).collection(collection).insertOne(query);
        console.log(JSON.stringify(result));
        client.close();
        return result;
    }catch(err){
        console.log(err);
        if (client != null){
            client.close();
        }
        return null;
    }
}

async function insert_many(database,collection,query){
    let result = null;
    let client = null;
    try{
        if(await utils.is_iterable(query)==false){
            throw "insert_many error --> query must be an array";
        }
        let credentials = await get_client_credentials("write");
        let client = await get_client(credentials);
        result = await client.db(database).collection(collection).insertMany(query);
    }catch(err){
        console.log(err);
        if (client != null){
            client.close();
        }
        return null;
    }
}

async function find_one(database,collection,query){
    let result = null;
    let client = null;
    try{
        let credentials = await get_client_credentials("read");
        let client = await get_client(credentials);
        result = await client.db(database).collection(collection).findOne(query);
        client.close();
        return result;
    }catch(err){
        console.log(err);
        if (client != null){
            client.close();
        }
        return null;
    }
}

async function find_all(database,collection){
    let result = null;
    let client = null;
    try{
        let credentials = await get_client_credentials("read");
        let client = await get_client(credentials);
        result = await client.db(database).collection(collection).find({}).toArray();
        console.log(JSON.stringify(result));
        client.close();
        return result;
    }catch(err){
        console.log(err);
        if (client != null){
            client.close();
        }
        return null;
    }
}

async function delete_all(database,collection){
    let result = null;
    let client = null;
    try{
        let credentials = await get_client_credentials("write");
        let client = await get_client(credentials);
        result = await client.db(database).collection(collection).deleteMany({});
        console.log(JSON.stringify(result));
        client.close();
        return result.deletedCount;
    }catch(err){
        console.log(err);
        if (client != null){
            client.close();
        }
        return null;
    }
}

async function delete_one(database,collection,query){
    let result = null;
    let client = null;
    try{
        let credentials = await get_client_credentials("write");
        let client = await get_client(credentials);
        result = await client.db(database).collection(collection).deleteOne(query);
        console.log(JSON.stringify(result));
        client.close();
        return result;
    }catch(err){
        console.log(err);
        if (client != null){
            client.close();
        }
        return null;
    }
}



module.exports = {
    find_all,
    insert_one,
    insert_many,
    find_one,
    delete_all,
    delete_one
}