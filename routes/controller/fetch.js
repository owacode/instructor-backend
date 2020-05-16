// // //  MongoDB Models
const Instructor = require('../../model/instructor');
const RegisteredInstructor = require('../../model/registered_instructor');
const Course = require('../../model/course');
const RegisteredDrawing = require('../../model/registered_drawing');

class FetchController {

  getAllInstructors() {
    return new Promise((resolve, reject) => {
      Instructor.find({})
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  getAllRegisteredInstructors(){
    return new Promise((resolve, reject)=> {
        RegisteredInstructor.find({}).sort({"date_added": -1} )
        .then(result=> {
            resolve(result);
        })
        .catch(err=>{
            reject(err);
        })
    })
}

getSingleRegisteredInstructor(id){
  return new Promise((resolve, reject)=> {
      RegisteredInstructor.findById({_id:id})
      .then(result=> {
          resolve(result);
      })
      .catch(err=>{
          reject(err);
      })
  })
}

  getApprovedInstructors() {
    return new Promise((resolve, reject) => {
      Instructor.find({ status: 'approved' })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  getPendingInstructors() {
    return new Promise((resolve, reject) => {
      Instructor.find({ status: 'pending' })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  getSingleInstructor(id) {
    return new Promise((resolve, reject) => {
      Instructor.find({ _id: id })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  getAllCourses() {
    return new Promise((resolve, reject) => {
      Course.find({})
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  getSingleCourse(id) {
    return new Promise((resolve, reject) => {
      Course.find({ _id: id })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  getPendingCourses() {
    return new Promise((resolve, reject) => {
      Course.find({ status: 'pending' })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  getApprovedCourse(id) {
    return new Promise((resolve, reject) => {
      Course.find({ status: 'approved' })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  getCoursesByInstructor(id) {
    console.log('instructor id', id)
    return new Promise((resolve, reject) => {
      Course.find({ userid: id })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  getDrawing() {
    return new Promise((resolve, reject) => {
      RegisteredDrawing.find({})
        .then(result => {
          return resolve(result);
        })
        .catch(err => {
          reject(err);
        })
    })
  }
}

module.exports = new FetchController()


