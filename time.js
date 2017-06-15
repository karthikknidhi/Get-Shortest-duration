require('./index2').then(getStatus => {
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/alexa';

var assert = require('assert');

function connect(url) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) reject(err);
            else resolve(db);
        });
    });
}


function getArray(cursor) {
    return new Promise(function(resolve, reject) {
        cursor.toArray(function(err, docs) {
            if (err) reject(err);
            else resolve(docs);
        });
    });
}


function p() {
    return connect(url).then(function(db) {
        return getArray(db.listCollections()).then(function(collections) {
            var promises = collections.map(function(collname) {
                return getArray(db.collection(collname.name).find().sort({duration_in_seconds: 1 }).limit(1));
            });
            return Promise.all(promises);
        });
    });
}

p().then(function(s) {
    
    for(i = 0;i<s.length-1;i++){
    h  = s[i][0].destination;
    var str = h.replace(/[,\s]+/g,'');
    var  k = (new RegExp(process.argv[3],'i')).test(str); 
    if(k){

      console.log(s[i][0]);
    }

}
    
    
});

});