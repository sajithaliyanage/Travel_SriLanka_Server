var mongoose = require('mongoose');
var schema = mongoose.Schema;

placeShema = new schema({
  lname:{type:String,require:true},
  category:{type:String},
  province:{type:String},
  city:{type:String,require:true},
  description:{type:String}
})

module.exports = mongoose.model("Place",placeShema);
