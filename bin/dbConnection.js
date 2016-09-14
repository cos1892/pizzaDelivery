var mongodb = require('mongodb');
var db = new mongodb.Db('delivery',
    new mongodb.Server('localhost', 27017, {})
);
db.open(function (err, db_p) {
    if (err) { throw err; }
});

exports.db = db;