conn = new Mongo()
db = connect("mongodb://root:root@localhost:27017/")
db = db.getSiblingDB('user')
db.user.insertOne({            "user_id": this.id,
"user_name": "test",
"user_password": "test",
"sig":"test",
"user_email":"None",
"literal_registry_date": 1,
"iso_date": 1,
"int_date": 1,
"services":"None",
"models": "None"
})
db = db.getSiblingDB('tokens')
db.active.insertOne({
    "sig" : "test",
    "token":"test",
    "iat":1,
    "exp" :"None",
}) 
db = db.getSiblingDB('admin')
db.createUser(
    {
        user:"mongoadmin",
        pwd:"k7y3yu7gufybu7tfgufysb73tugi%h83Q3!=sahsd_%Fa1",
        roles :[ {role : "userAdminAnyDatabase",db: "admin"} ]
    })
db.auth("mongoadmin","k7y3yu7gufybu7tfgufysb73tugi%h83Q3!=sahsd_%Fa1")
db = db.getSiblingDB('admin')
db.createUser(
    {
        user:"writer",
        pwd:"lahkd7yi73ghka7tigri7a3iaiga",
        roles :[ {role : "readWrite",db: "users"},{role:"readWrite",db:"tokens"} ]
    })

db.createUser(
    {
        user:"reader",
        pwd:"au6stduga63ugi7ai28hi7gua6wge",
        roles :[ {role : "read",db: "users"},{role:"read",db:"tokens"} ]
    })
