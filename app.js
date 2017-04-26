var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var Place = require('./place');

app.use(bodyParser.json());
app.use(cors());

app.get('/',function(req,res){
  res.send("Hello_World");
});

app.post('/postData',function(req,res){
  //console.log(req.body);
  var placeTable = new Place(req.body);
  placeTable.save(function(err,docs){
    console.log(docs);
    res.json(docs);
  })
});

app.get('/getData',function(req,res){
  Place.find(function(err,docs){
    //console.log(docs);
    res.json(docs)
  })
});

app.get('/getOneData/:id',function(req,res){
  var id = req.params.id;
  Place.findOne({_id:id},function(err,doc){
    res.json(doc);
  });
});

app.get('/searchData/:key',function(req,res){
  var key = req.params.key;
  //console.log(key.length);
  if(!key){
	console.log("Fuck");
  }
  Place.find( {"lname" :{$regex : ".*"+key+".*", $options: '-i'}},function(err,docs){
    //console.log(docs);q
    res.json(docs)
  })
});

app.listen(3000,function(){
	console.log('Server running at http://127.0.0.1:3000/');
});

//connection og MongoDB
var conn = mongoose.connect('localhost:27017/travel');
//var conn = mongoose.connect('mongodb://sajithaliyanage:capn@sv12@ds161950.mlab.com:61950/travel');
if(conn){
  console.log('MongoDB Connected');
}else{
  console.log('MongoDB NOT Connected');
}
