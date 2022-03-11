conn = new Mongo()
db = connect("mongodb://root:root@localhost:27017/")
db = db.getSiblingDB('user')
db.user.insertOne({ok:1})
db = db.getSiblingDB('tokens')
db.active.insertOne({
    "sig" : 1,
    "token":1,
    "iat":1,
    "exp" :1,
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
