const express= require('express');
const routes= express.Router();
const upload=require('./others/multer');
const cloudinary =require('cloudinary');
const cloudinarydetail=require('./others/cloudinary');
// Controllers
const adderController= require('./controller/adder');
const deleteController= require('./controller/delete');
const updateController= require('./controller/update');
const fetchController= require('./controller/fetch');



routes.post('/addinstructor',(req,res)=> {
  console.log(req.body,'beforeeeee');
    adderController.addNewInstructor(req.body)
    .then(result=> {
      console.log(result)
      res.json({
        status:'success',
        msg:'Instructor Registered Successfully',
        result:result
      })
    })
    .catch(err=> {
      res.json({
        status:'error',
        error:err
      })
    })
})

routes.post('/register-instructor',(req,res)=> {
  console.log(req.body,'beforeeeee');
    adderController.addRegisteredInstructor(req.body)
    .then(result=> {
      console.log(result)
      res.json({
        status:'success',
        msg:'Instructor Registered Successfully',
        result:result
      })
    })
    .catch(err=> {
      res.json({
        status:'error',
        error:err
      })
    })
})

routes.get('/activate/:token', (req, res) => {
  adderController.verifyMail(req.params)
  .then(result =>{
      res.status(200).redirect('http://onewater.herokuapp.com/thankyou-instructor');
  })
  .catch(err => {
    res.status(400).json({
      status:'error',
      error:err
    })
  })
})

routes.post('/updateinstructor',(req,res)=> {
  console.log(req.body,'beforeeeee');
    updateController.updateInstructorDetails(req.body)
    .then(result=> {
      console.log(result)
      res.json({
        status:'success',
        msg:'Instructor Registered Successfully',
        result:result
      })
    })
    .catch(err=> {
      res.json({
        status:'error',
        error:err
      })
    })
})

//Uploading a New Resume
routes.post('/addcourse' ,(req,res)=>{
  adderController.addNewCourse(req.body)
  .then(result=>{
    res.json({
      status:'success',
      msg:"Course Added Successfully",
      result:result
    })
  })
  .catch(err => {
      res.json({
        status:'error',
        msg:'Error in adding new course',
        error:err
      })
  })
})

routes.post('/updateinstructorprofile',(req, res)=> {
  console.log('status',req.body)
  updateController.updateInstructorStatus(req.body)
  .then(result=> {
    res.json({
      status:'success',
      msg:"Instructor Status Updated Successfully",
      result:result
    })
  })
  .catch(err=> {
    res.json({
      status:'error',
      err:err,
      msg:"Error in Updating Insturctor Status"
    })
  })
})

routes.post('/updatecoursestatus',(req,res)=>{
  console.log(req.body)
  updateController.updateCourseStatus(req.body.id)
  .then(result=> {
    res.json({
      status:'success',
      msg:'Course Status Updated',
      result:result
    })
  })
  .catch(err=> {
    res.json({
      status:'error',
      error:err
    })
  })
})

routes.post('/register-drawing',(req,res)=>{
  console.log(req.body)
  adderController.drawing(req.body)
  .then(result=> {
    res.json({
      status:'success',
      msg:'Registered for Drawing',
      result:result
    })
  })
  .catch(err=> {
    res.json({
      status:'error',
      error:err
    })
  })
})

routes.post('/applytojob',(req,res)=>{
  updateController.applyToJob(req.body)
  .then(result=> {
    res.json({
      status:'success',
      msg:'Applied To Job Successfully. If filter out you will be respond back via Mail',
      result:result
    })
  })
  .catch(err=> {
    res.json({
      status:'error',
      error:err
    })
  })
})

routes.post('/login', (req, res)=> {
  adderController.login(req.body)
  .then(result=> {
    res.status(201).json({
      status:'success',
      result:result
    })
  })
  .catch(err=> res.status(401).json({
    status:'error',
    msg:"Invalid UserName or Password",
    error:err
  }))
})

routes.post('/reset-password', (req, res)=> {
  console.log(req.body);
  updateController.recoverPassword(req.body.email)
  .then(result => res.json({
    status: 'success',
    msg: 'Check you email',
    result: result
  }))
  .catch(err=> res.json({
    status: 'error',
    msg: 'Email not Exist',
    error: err
  }))
})

routes.post('/update-password',( req, res)=>{
  console.log(req.body);
  updateController.updatePassword(req.body)
  .then(result => res.json({
    status: 'success',
    msg: 'Password Update Successfully',
    result: result
  }))
  .catch(err=> res.json({
    status: 'error',
    msg: 'Error in Updating Password',
    error: err
  }))
})
module.exports= routes;
