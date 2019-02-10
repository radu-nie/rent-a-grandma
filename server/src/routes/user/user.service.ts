
const mongodb = require('mongodb');
const mongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const config = require('config');

export class UserService {
    users: any;
    constructor() {
    }


    setUsers() {
        return this.users;
    }
    userName(param: any) {
        return 'Go to another WEB API layer';
    }
    getUserById(id: any, cba: any) {
        var promise = new Promise(function (resolve, reject) {
            var url = config.get('dbConfig.url');

            mongoClient.connect(url, function (err: any, db: any) {
                if (err) throw err;
                var dbo = db.db("nodeAPI");

                var query = {
                    _id: new mongodb.ObjectID(id)
                };
                dbo.collection("users").findOne(query, (err: any, userFound: any) => {
                    if (userFound) {
                        cba(err, userFound);
                    } else {
                        cba(err, null);
                    }
                    db.close();
                });
            });
        });

    }
    deleteUserByID(id: any, cba: any) {
        var url = config.get('dbConfig.url');

        mongoClient.connect(url, function (err: any, db: any) {
            if (err) throw err;
            var dbo = db.db("nodeAPI");
            var query = {
                _id: new mongodb.ObjectID(id)
            };
            dbo.collection("users").deleteOne(query, function (err: any, user: any) {
                cba(err, user);
                db.close();
            });
        });

    }
    authenticate(userInfo: any, cba: any) {
        var url = config.get('dbConfig.url');

        mongoClient.connect(url, function (err: any, db: any) {
            if (err) throw err;
            var dbo = db.db("nodeAPI");

            var query = {
                username: userInfo.username
            };
            dbo.collection("users").findOne(query, (err: any, userFound: any) => {
                // check if password are matching
                if (userFound) {
                    if (bcrypt.compareSync(userInfo.password, userFound.password)) {
                        cba(err, userFound);
                    } else {
                        cba(err, null);
                    }
                } else {
                    cba(err, null);
                }
                db.close();
            });

        });
    }
    register(userInfo: any, cba: any) {
        var url = config.get('dbConfig.url');

        mongoClient.connect(url, function (err: any, db: any) {
            if (err) throw err;
            var dbo = db.db("nodeAPI");

            var uPass = bcrypt.hashSync(userInfo.password, 7);

            var query = {
                username: userInfo.username,
                password: uPass,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName
            };
            dbo.collection("users").insertOne(query, function (err: any, res: any) {
                cba(err, res);
                db.close();
            });
        });
    }
    getUsers(cba: any) {
        var url = config.get('dbConfig.url');

        mongoClient.connect(url, function (err: any, db: any) {
            if (err) throw err;
            var dbo = db.db("nodeAPI");
            var query = {};
            dbo.collection("users").find(query).toArray(function (err: any, user: any) {
                cba(err, user);
                db.close();
            });
        });
    }
}



