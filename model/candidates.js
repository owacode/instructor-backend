const mongoose= require('mongoose');
// Package to make a field of table auto-increasement
const auoInCrease = require('mongodb-autoincrement');
/**
 * Create Blog Model
 * Add AutoIncrease Plugin
 */
const candidate = mongoose.Schema({
  name:{type: String,required:true},
  location:{type:String, require:true},
  profile_description:{type: String,required:true},
  email:{type: String,required:true},
  linked_In:{type: String,required:true},
  gender:{type: String,required:true},
  experience:{type: String,required:true},
  profile_image:{type: String,required:true},
  intrested_fields:{type: String,required:true},
  date_added:{type: Date},
  jobs_applied:[],
  resume:{type: String,required:true},
  qualification:{type: String,required:true},
  candidate_no:{type:Number}
}).plugin(auoInCrease.mongoosePlugin, {
  field: 'candidate_no'
});

module.exports = mongoose.model('Candidate', candidate, 'Candidates');
