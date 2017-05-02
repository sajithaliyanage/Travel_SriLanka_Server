var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var Place = require('./place');
const fileUpload = require('express-fileupload');
var mkdirp = require('mkdirp');

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());


mongoose.connect('mongodb://sajitha:sajitha123@ds161950.mlab.com:61950/travel', function(err) {
    if (err) throw err;
});

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
	console.log("hello");
  }
  Place.find( {"lname" :{$regex : ".*"+key+".*", $options: '-i'}},function(err,docs){
    //console.log(docs);q
    res.json(docs)
  })
});

app.post('/uploadImage', function(req, res) {
  console.log("This is the one - "+req.body);
 if (!req.files)
    return res.status(400).send('No files were uploaded.');

  let sampleFile = req.files.file;
  //var nameImage = req.files.upload.name;
 
  sampleFile.mv('https://hidden-thicket-18651.herokuapp.com/uploads/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});






//app.listen(3000,function(){
	//console.log('Server running at http://127.0.0.1:3000/');
//});

//connection og MongoDB
//var conn = mongoose.connect('localhost:27017/travel');

app.listen(process.env.PORT || 3000, function(){
  console.log("Done");
});

