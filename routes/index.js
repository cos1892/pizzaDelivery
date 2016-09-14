var express = require('express');
var router = express.Router();
var connection = require('../bin/dbConnection');
var db = connection.db;
var ObjectID = require('mongodb').ObjectID;

/* GET home page. */

router.get('/', function(req, res, next) {
	
});

router.post('/basket', function(req, res, next){
    var collection;
    var async = require('async');
    var taskReq = [];
    for(var key in req.body) {
        var collection = {
            key : key,
            items : req.body[key]
        }
        taskReq.push(
            function (callback) {
                db.collection(this.key).find({
                    "_id" : {
                        $in : this.items.map((item) => new ObjectID(item.id) )
                    }
                }).toArray( function(err, result){
                    callback(err, result);
                })
            }.bind(collection)
        )
    }


    
    async.parallel(taskReq, function(err , result) {
        if(err) {
            return res.status(500).end();
        }
        res.send(result);
    });
});

router.get('/drink', function(req, res, next) {
	var collection = db.collection('drinks');

    if(req.query.pageSizeNumber)
    {
        var pageSize = req.query.pageSizeNumber;
        collection.count({}, function(error, count) {
        var numberOfPages = Math.ceil(count / pageSize);
            collection.find({}).limit(9).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.send({list: result, number: numberOfPages});
                } else {
                    res.send('No documents found');
                }

            });
        });
    } else if(req.query.page) {
        var page = req.query.page;
        collection.find({}).limit(9).skip(page*9).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.send(result);
                } else {
                    res.send('No documents found');
                }

            });
    } 
	
});

router.get('/pizza', function(req, res, next) {

     var objectSearch = {},
        objectSize = {},
        objectIngredeents = {},
        arrType = [],
        arrSize = [],
        arrIngredeents = [],
        arrAnd = [],
        priceFrom,
        priceTo;

    if(req.query.type) {
        if(req.query.type instanceof Array) {
            arrType = req.query.type;
        } else {
            arrType[0] = req.query.type;
        }

        objectSearch.type = {$in : arrType};
    }    

    if(req.query.price_from){
        priceFrom = req.query.price_from;
    } else {
        priceFrom = '0';
    }

    if(req.query.price_to) {
        priceTo = req.query.price_to;
    } else {
        priceTo = '35';
    }

    objectSearch['children.coast'] = {$gte: priceFrom};
    objectSearch['family.coast'] = {$lte: priceTo};

    if(req.query.size) {
        if(req.query.size instanceof Array) {
            req.query.size.forEach(function(item, i, arr) {
                var objSize = {};
                objSize[item] = {$exists: true};
                arrSize.push(objSize);
            });
            objectSize['$or'] = arrSize;
            arrAnd.push(objectSize);
        } else {
            objectSearch[req.query.size] = {$exists: true};
        }
    }

    if(req.query.ingredeents) {
        if(req.query.ingredeents instanceof Array) {
            req.query.ingredeents.forEach(function(item, i, arr) {
                var objComposition = {};
                objComposition['composition'] = new RegExp(item,'i');
                arrIngredeents.push(objComposition);
            });
            objectIngredeents['$or'] = arrIngredeents;
            arrAnd.push(objectIngredeents);
        } else {
            if (req.query.ingredeents === "onion" || req.query.ingredeents === "garlic") {
                var objComposition = {};
                objComposition['$ne'] = new RegExp(req.query.ingredeents,'i');
                objectSearch.composition = objComposition;
            } else {
                objectSearch.composition = new RegExp(req.query.ingredeents,'i');
            }
        }
    }

    if(req.query.size instanceof Array && req.query.ingredeents instanceof Array) {
        objectSearch['$and'] = arrAnd;
    } else if(req.query.size instanceof Array) {
        objectSearch['$or'] = arrSize;
    } else if(req.query.ingredeents instanceof Array) {
        objectSearch['$or'] = arrIngredeents;
    }

    var collection = db.collection('pizza');

    if(req.query.pageSizeNumber)
    {
        var pageSize = req.query.pageSizeNumber;
        collection.count(objectSearch, function(error, count) {
            var numberOfPages = Math.ceil(count / pageSize);
            var objTest = {
                key: function() {
                    return this.type == "vegetarian";
                }
            };
            var func = function (){
                // var reg = /garlic/i;
                // if(reg.test(this.composition)) {
                //     return false;
                // } else {
                //     return true;
                // }  
                // if(this.type == "vegetarian"){
                //     return true;
                // } else {
                //     return false;
                // } 
                return this.type == "vegetarian";        
            }
            collection.find(objectSearch).limit(9).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.send({list: result, number: numberOfPages, count: count});
                } else {
                    res.send('No documents found!');
                }

            });
        });
    } else if(req.query.page) {
        var page = req.query.page;
        collection.find(objectSearch).limit(9).skip(page*9).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.send(result);
                } else {
                    res.send('No documents found');
                }

            });
    } 
    
});

router.get('/salad', function(req, res, next) {
    var collection = db.collection('salads');

    if(req.query.pageSizeNumber)
    {
        var pageSize = req.query.pageSizeNumber;
        collection.count({}, function(error, count) {
        var numberOfPages = Math.ceil(count / pageSize);
            collection.find({}).limit(9).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.send({list: result, number: numberOfPages});
                } else {
                    res.send('No documents found');
                }

            });
        });
    } else if(req.query.page) {
        var page = req.query.page;
        collection.find({}).limit(9).skip(page*9).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.send(result);
                } else {
                    res.send('No documents found');
                }

            });
    } 
    
});

router.get('/soup', function(req, res, next) {
    var collection = db.collection('soups');

    if(req.query.pageSizeNumber)
    {
        var pageSize = req.query.pageSizeNumber;
        collection.count({}, function(error, count) {
        var numberOfPages = Math.ceil(count / pageSize);
            collection.find({}).limit(9).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.send({list: result, number: numberOfPages});
                } else {
                    res.send('No documents found');
                }

            });
        });
    } else if(req.query.page) {
        var page = req.query.page;
        collection.find({}).limit(9).skip(page*9).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.send(result);
                } else {
                    res.send('No documents found');
                }

            });
    } 
    
});

router.get('/hotDish', function(req, res, next) {
    var collection = db.collection('hotDishes');

    if(req.query.pageSizeNumber)
    {
        var pageSize = req.query.pageSizeNumber;
        collection.count({}, function(error, count) {
        var numberOfPages = Math.ceil(count / pageSize);
            collection.find({}).limit(9).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.send({list: result, number: numberOfPages});
                } else {
                    res.send('No documents found');
                }

            });
        });
    } else if(req.query.page) {
        var page = req.query.page;
        collection.find({}).limit(9).skip(page*9).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.send(result);
                } else {
                    res.send('No documents found');
                }

            });
    } 
    
});

router.get('/breakfast', function(req, res, next) {
    var collection = db.collection('breakfasts');

    if(req.query.pageSizeNumber)
    {
        var pageSize = req.query.pageSizeNumber;
        collection.count({}, function(error, count) {
        var numberOfPages = Math.ceil(count / pageSize);
            collection.find({}).limit(9).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.send({list: result, number: numberOfPages});
                } else {
                    res.send('No documents found');
                }

            });
        });
    } else if(req.query.page) {
        var page = req.query.page;
        collection.find({}).limit(9).skip(page*9).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.send(result);
                } else {
                    res.send('No documents found');
                }

            });
    } 
    
});

router.get('/fitnessMenu', function(req, res, next) {
    var collection = db.collection('fitnessMenu');

    if(req.query.pageSizeNumber)
    {
        var pageSize = req.query.pageSizeNumber;
        collection.count({}, function(error, count) {
        var numberOfPages = Math.ceil(count / pageSize);
            collection.find({}).limit(9).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.send({list: result, number: numberOfPages});
                } else {
                    res.send('No documents found');
                }

            });
        });
    } else if(req.query.page) {
        var page = req.query.page;
        collection.find({}).limit(9).skip(page*9).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.send(result);
                } else {
                    res.send('No documents found');
                }

            });
    } 
    
});

router.get('/dessert', function(req, res, next) {
    var collection = db.collection('disserts');

    if(req.query.pageSizeNumber)
    {
        var pageSize = req.query.pageSizeNumber;
        collection.count({}, function(error, count) {
        var numberOfPages = Math.ceil(count / pageSize);
            collection.find({}).limit(9).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.send({list: result, number: numberOfPages});
                } else {
                    res.send('No documents found');
                }

            });
        });
    } else if(req.query.page) {
        var page = req.query.page;
        collection.find({}).limit(9).skip(page*9).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.send(result);
                } else {
                    res.send('No documents found');
                }

            });
    } 
    
});

module.exports = router;