const mongoose= require('mongoose');
// Package to make a field of table auto-increasement
const auoInCrease = require('mongodb-autoincrement');
/**
 * Create Blog Model
 * Add AutoIncrease Plugin
 */
const course = mongoose.Schema({
  userid:{type: String,required:true},
  useremail:{ type: String, required: true},
  title:{type: String,required:true},
  content_link:{type:String, required:true},
  category:{type: String,required:true},
  status:{type:String, required:true},
  date_approved:{type:Date},
  date_added:{type:Date},
  course_no:{type:Number}
}).plugin(auoInCrease.mongoosePlugin, {
  field: 'course_no'
});

module.exports = mongoose.model('Course', course, 'Courses');
