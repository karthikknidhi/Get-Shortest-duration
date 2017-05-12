require('./index2').then(getStatus => {
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/alexa';
var x = [];
var string = "SantaClaraCAUSA";
var assert = require('assert');


var str = string.replace(/[,\s]+/g,'');

var p = function(str){
return new Promise(function(resolve, reject) {
	MongoClient.connect(url, function (err, db) {
	 db.collection(str).find().sort( { duration: 1 }).limit(1).toArray(
	function(err, docs) {
        assert.equal(null, err);
        x.push(docs);
        resolve('Success!');
      });
        
       //db.close();
  });
	
});

}


p(str).then(function(uid) {
  console.log(x);
});

});



/*p.then(function() { 
	
	console.log(x);
})*/