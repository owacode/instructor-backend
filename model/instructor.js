const mongoose= require('mongoose');
// Package to make a field of table auto-increasement
const auoInCrease = require('mongodb-autoincrement');
const validator=require('mongoose-unique-validator');
/**
 * Create Blog Model
 * Add AutoIncrease Plugin
 */
const instructor = mongoose.Schema({
  name:{type: String },
  email:{type: String , unique:true},
  password:{type: String },
  mobile_no:{type: Number},
  linkedIn:{type: String},
  nationality:{type: String},
  profession:{type: String},
  date_added:{type: Date},
  salt:{type: String },
  verified:{type: Boolean },
  token:{type: String },
  form_filled:{type: Boolean },
  status:{type: String },
  instructor_no:{type:Number},
}).plugin(auoInCrease.mongoosePlugin, {
  field: 'instructor_no'
},validator);

module.exports = mongoose.model('Instructor', instructor, 'Instructors');
