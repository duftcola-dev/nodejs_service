const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";


function create_mongo_clietn(){
    const client = new MongoClient(uri);
    return client;
}

async function Connect(client){
    try{
        await client.connect();
        await client.db(admin).command({ping:1});

    }catch(err){
        console.log("Failed to connect to database")
        return false;
    }finally{
        console.log("connection successfull");
        return client;
    }
    
}