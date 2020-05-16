const mongoose= require('mongoose');
// Package to make a field of table auto-increasement
const auoInCrease = require('mongodb-autoincrement');
const validator=require('mongoose-unique-validator');
/**
 * Create Blog Model
 * Add AutoIncrease Plugin
 */
const instructor = mongoose.Schema({
  firstname:{type: String },
  lastname:{type: String },
  email:{type: String , unique:true},
  organization:{type: String },
  category:{type: String },
  mobile_no:{type: Number, default:null},
  proposed_course_topic:{type: String},
  course_type:{type: String},
  proposed_course_title:{type: String},
  proposed_desc:{type: String },
  instructor_no:{type:Number},
  date_added:{type: Date}
}).plugin(auoInCrease.mongoosePlugin, {
  field: 'instructor_no'
},validator);

module.exports = mongoose.model('RegisteredInstructor', instructor, 'RegisteredInstructors');
