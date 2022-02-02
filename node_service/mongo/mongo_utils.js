const { MongoClient } = require("mongodb");


async function connect_client(permition_type){
    try{
        let uri = "";
        if (permition_type == "write"){//"mongodb://user:user_password@localhost:27017/"
            uri = CONFIG.mongo_service+"://"+CONFIG.db_write+":"+CONFIG.db_write_p+"@"+CONFIG.db_host+":"+CONFIG.db_port+"/";

        }
        if (permition_type == "read"){
            uri = CONFIG.mongo_service+"://"+CONFIG.db_read+":"+CONFIG.db_read_p+"@"+CONFIG.db_host+":"+CONFIG.db_port+"/";
        }

        console.log(uri);
        mongo_client = new MongoClient(uri,{ useUnifiedTopology: true })
        let client =  mongo_client.connect(uri);
        if (MongoClient.isConnected() == false){throw "Error : connect_client --> cannot connect to database!";}
        return client

    }catch (err){
        return null;
    }
}


async function get_cursor(client,database,collection){
    const _database  = client.db(database);
    const _collection = _database.collection(collection);
    return _collection;
}


async function insert_one(database,collection,query){
    let result = null;
    let client =null;
    try{
        client = await connect_client("write");
        let cursor = await get_cursor(client,database,collection);
        result = await cursor.insertOne(query);
        client.close()
    }catch (err){
        console.log("Error : Cannot access database")
        result = -1;
        client.close()
    }finally{
        return result;
    }
}


async function find(database,collection,query){
    let result = null;
    let client = null;
    try{
        client = await connect_client("read");
        let cursor =await get_cursor(client,database,collection);
        result = await cursor.findOne(query);
        client.close()
    }catch (err){
        console.log("Error : Cannot access database")
        result = -1;
        client.close()
    }finally{
        return result;
    }
}

module.exports = {
    find,
    insert_one,
}