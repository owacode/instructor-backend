const mongoose= require('mongoose');
// Package to make a field of table auto-increasement
const auoInCrease = require('mongodb-autoincrement');
const validator=require('mongoose-unique-validator');
/**
 * Create Blog Model
 * Add AutoIncrease Plugin
 */
const candidate = mongoose.Schema({
  firstname:{type: String,required:true},
  lastname:{type: String,required:true},
  organization:{type: String,required:true},
  email:{type:String, require:true, unique:true},
  date_registered: {type: Date},
  candidate_no:{type:Number}
}).plugin(auoInCrease.mongoosePlugin, {
  field: 'candidate_no'
},validator);
module.exports = mongoose.model('RegisteredDrawing', candidate, 'RegisteredDrawing');
