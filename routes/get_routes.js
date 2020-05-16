const express= require('express');
const routes= express.Router();
// Controllers
const adderController= require('./controller/adder');
const deleteController= require('./controller/delete');
const updateController= require('./controller/update');
const fetchController= require('./controller/fetch');


routes.get('/getinstructor',(req, res)=> {
  fetchController.getAllInstructors()
  .then(result=> {
      res.json({
          status:'success',
          msg:'List of Courses ',
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

routes.get('/get-registeredinstructor',(req, res)=> {
  fetchController.getAllRegisteredInstructors()
  .then(result=> {
      res.json({
          status:'success',
          msg:'List of Registered Instructor ',
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

routes.get('/get-registeredinstructor/:id',(req, res)=> {
  fetchController.getSingleRegisteredInstructor(req.params.id)
  .then(result=> {
      res.json({
          status:'success',
          msg:'List of Registered Instructor ',
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

routes.get('/register-drawing',(req,res)=>{
  console.log(req.body)
  fetchController.getDrawing()
  .then(result=> {
    res.json({
      status:'success',
      msg:'Fetch Registered for Drawing',
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

routes.get('/getpendinginstructor',(req, res)=> {
  fetchController.getPendingInstructors()
  .then(result=> {
      res.json({
          status:'success',
          msg:'List of Pending Instructor ',
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

routes.get('/getapprovedinstructor',(req, res)=> {
  fetchController.getApprovedInstructors()
  .then(result=> {
      res.json({
          status:'success',
          msg:'List of Approved Instructor ',
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

routes.get('/getinstructor/:id',(req, res)=> {
  fetchController.getSingleInstructor(req.params.id)
  .then(result=> {
      res.json({
          status:'success',
          msg:'Single Instructor ',
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

routes.get('/getcourses',(req, res)=> {
    fetchController.getAllCourses()
    .then(result=> {
        res.json({
            status:'success',
            msg:'List of Courses ',
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

routes.get('/getpendingcourses',(req, res)=> {
  fetchController.getPendingCourses()
  .then(result=> {
      res.json({
          status:'success',
          msg:'List of Courses ',
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

routes.get('/getapprovedcourses',(req, res)=> {
  fetchController.getApprovedCourse()
  .then(result=> {
      res.json({
          status:'success',
          msg:'List of Courses ',
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

routes.get('/getinstructorcourses/:id',(req, res)=> {
  console.log(req.params,'inst')
    fetchController.getCoursesByInstructor(req.params.id)
    .then(result=> {
        res.json({
            status:'success',
            msg:'List of Courses By Instructor ',
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

// Get All Jobs For Pagination
routes.get('/singlecourse/:id',(req, res)=> {
  console.log('parms',req.params);
    fetchController.getSingleCourse(req.params.id)
    .then(result=> {
        res.json({
            status:'success',
            msg:'Single Course ',
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

routes.get('/singlejob/:id',(req, res)=> {
    fetchController.getSingleJobs(req.params.id)
    .then(result=> {
        res.json({
            status:'success',
            msg:'Job Detail',
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

routes.get('/singlecompany/:id',(req, res)=> {
    fetchController.getSingleCompany(req.params.id)
    .then(result=> {
        res.json({
            status:'success',
            msg:'Company Detail',
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

routes.get('/company_posted_jobs/:id',(req, res)=> {
  console.log(req.params,'dwdw')
    fetchController.getAllJobsByACompany(req.params.id)
    .then(result=> {
        res.json({
            status:'success',
            msg:'Company Detail',
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

routes.get('/applicants/:id',(req, res)=> {
    fetchController.getApplicants(req.params.id)
    .then(result=> {
        res.json({
            status:'success',
            msg:'Company Detail',
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

routes.get('/candidates',(req, res)=> {
  fetchController.getCandidates()
  .then(result=> {
      res.json({
          status:'success',
          msg:'Candidates Detail',
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

routes.get('/candidate/:id',(req, res)=> {
  fetchController.getSingleCandidates(req.params.id)
  .then(result=> {
      res.json({
          status:'success',
          msg:'Single Candidates Detail',
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

routes.get('/candidate-applied-jobs/:id',(req, res)=> {
  fetchController.getCandidateJobs(req.params.id)
  .then(result=> {
      res.json({
          status:'success',
          msg:'Single Candidate Jobs Applied',
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


routes.get('/suscribed',(req, res)=> {
  fetchController.getsuscribed()
  .then(result=> {
      res.json({
          status:'success',
          msg:'Fetch Suscribed Candidates',
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
module.exports= routes
