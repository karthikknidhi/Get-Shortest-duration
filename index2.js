var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var url = 'mongodb://localhost:27017/alexa';
var distance = require('google-distance-matrix');
var origins = ['San Francisco CA'];
var destinations = ['Sanjose', 'santaclara'];
var duration;
var dep_time = new Date().getTime();
var times = new Array();
var p ;
distance.key('<enteryourkey>'); // google key
distance.mode('driving');
var myobj2 = [];
var dep = [];

for(j=0;j<8;j++){
  dep.push(dep_time);
  dep_time = dep_time + 600;

}

function getMatrix(m, o, d) {
    return new Promise(function(resolve, reject) {
        m.matrix(o, d, function(err, distances) {
            if (err) reject(err);
            else     resolve(distances);
        });
    });
}


function save(url, store, k) {
// cramming connect+insert in here is not optimal but let's not get into unnecessary detail
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, function(err, db) {
            if (err)
                reject(err);
            else
                db.collection(k).insert(store, function(err, results) {
                    if (err) reject(err);
                    else     resolve(results);
                    db.close();
                });
        });
    });
}


module.exports = Promise.all(dep.map(function(name) {
    distance.departure_time(name);
    return getMatrix(distance, origins, destinations).then(function(distances) {
        if (!distances) throw new Error('no distances');
        var promises = [];
        if (distances.status == 'OK') {
            for (var i=0; i < origins.length; i++) {
                for (var j = 0; j < destinations.length; j++) {
                    var origin = distances.origin_addresses[i];
                    var destination = distances.destination_addresses[j];
                    if (distances.rows[0].elements[j].status == 'OK') {
                        var duration = distances.rows[i].elements[j].duration_in_traffic.value;
                        var myobj = {
                            destination: destination,
                            departure_time: name,
                            duration: duration
                        };
                        var str = destination.replace(/[,\s]+/g, '');
                        promises.push(save(url, myobj, str));
//                                    
                    }
                }
            }
        }
        return Promise.all(promises); // now wait for all save results
    });
}));






/*var ted = dep.map(function(name){
    
    return new Promise(function(resolve,reject){

    distance.departure_time(name);

    distance.matrix(origins, destinations, function (err, distances) {
   
    if (err) {
        return console.log('error');
    }
    if(!distances) {
        return console.log('no distances');
    }
    if (distances.status == 'OK') {
        for (var i=0; i < origins.length; i++) {
            for (var j = 0; j < destinations.length; j++) {
                var origin = distances.origin_addresses[i];
                var destination = distances.destination_addresses[j];
                if(distances.rows[0].elements[j].status == 'OK') {
                    duration = distances.rows[i].elements[j].duration_in_traffic.value;
                    myobj = new Object();
                    myobj.destination = destination;
                    myobj.departure_time = name;
                    myobj.duration = duration;
                    str = destination.replace(/[,\s]+/g, '');
                    p = Promise.resolve(savemongo(myobj,str));
                    
                }else {
                    console.log("err");
                }
            }
        }
    }
    resolve();
    });
  
    });
});

module.exports = Promise.all([ted,p]);

/*Promise.all(ted,p).then(function(){ 





});*/


/*var savemongo = function(store , k) {

MongoClient.connect(url, function(err, db) {
        postobject(db, function() {
            db.close();
            
        });
});
var postobject = function(db, callback) {
db.collection(k).insert(store,function(err, results) {
        callback();
       
    });
};*/

/*}*/