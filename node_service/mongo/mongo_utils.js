const { MongoClient } = require("mongodb");
const uri = "mongodb://root:root@localhost:27017/";
const CONFIG = require("../index/CONFIG");

async function check_connection(){
    let client = null;
    let result = false;
    try{

    client =await MongoClient.connect(uri);
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
    result = true;    
    }catch (err){
        console.log("Error , cannot connect to databse");
    }finally{
        await client.close();
        return result;
    }
}

async function insert_one(database,collection,data){
    let result = null;
    let client = null;
    try{
        client =await MongoClient.connect(uri);
        const _database  = client.db(database);
        const _collection = _database.collection(collection);
        const query = data;
        result = await _collection.insertOne(query);
    }catch (err){
        console.log("Error : Cannot access database")
        result = -1;
    }finally{
        client.close()
        return result;
    }
}


async function find(database,collection,data){
    let result = null;
    let client = null;
    try{
        client =await MongoClient.connect(uri);
        const _database  = client.db(database);
        const _collection = _database.collection(collection);
        const query = data;
        result = await _collection.findOne(query);
    }catch (err){
        console.log("Error : Cannot access database")
        result = -1;
    }finally{
        client.close()
        return result;
    }
}

module.exports = {
    check_connection,
    find,
    insert_one
}