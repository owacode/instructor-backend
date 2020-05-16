//  MongoDB Models
const Course= require('../../model/course');
const Instructor= require('../../model/instructor');
const Candidate= require('../../model/candidates');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodeoutlook = require('nodejs-nodemailer-outlook');

const nodemailerAuthCredential = {
        user: "OWACODE@onewateracademy.org",
        pass: "Panda@21"
}
let token;
class UpdateController {
  // Updating a Blog
  addJobToCompany(value){
    return new Promise((resolve, reject)=> {
      Companies.findByIdAndUpdate({_id:value.id},{ $addToSet: { jobs_posted: value.jobid }} )
      .then(response=> {console.log('Job Added to Company'); resolve(response)})
      .catch(err=> reject(err));
    })
  }

  applyToJob(value){
    return new Promise((resolve, reject)=> {
      JobPosted.findByIdAndUpdate({_id:value.id},{ $addToSet: { resume: value.resume, applicants:value.applicant_id }} )
      .then(response=> {
        console.log('Job Added to Company');
        const data={
          id:value.applicant_id,
          job_id:value.id
        }
        this.addJobToCandidate(data);
        resolve(response)
      })
      .catch(err=> reject(err));
    })
  }

  updateInstructorStatus(values){
    return new Promise((resolve, reject)=> {
      Instructor.findByIdAndUpdate({_id:values.id},{ $set: { status:'approved' }} )
      .then(response=> { sendMail(values.email); console.log('Instructor Profile Updated'); resolve(response)})
      .catch(err=> reject(err));
    })
  }

  updateInstructorDetails(values){
    return new Promise ((resolve, reject)=>{
      Instructor.findOneAndUpdate({_id:values.instructorid},{ $set: {
        mobile_no:values.mobile_no,
        nationality:values.nationality,
        profession:values.profession,
        linkedIn:values.linkedIn,
        form_filled:true
      }})
    .then(result=>{
      resolve(result);
    })
    .catch(err=>{
      reject(err);
    })
    })
  }

  updateCourseStatus(id){
    console.log(id,'testtt');
    return new Promise((resolve, reject)=> {
      Course.findOneAndUpdate({_id:id},{
        $set: {
          status:'approved',
          date_approved:getTime(),
        }
      })
      .then(result=> {
        console.log(result,'kji');
        resolve(result);
      })
      .catch(err=> {
        reject(err);
      })
    })
  }

  recoverPassword(email) {
    return new Promise((resolve, reject) => {
      console.log('got email',email)
      token = jwt.sign({ email: email,platform: 'instructor' }, '@@#%&$ve%*(tok?inst?ruct?or//-!!==+++!!!e!!n)@reset@@@@pass');
      console.log(token);
      Instructor.find({email: email})
      .then(result=>{
        console.log(result)
        if(result.length == 0){
          reject("Email Not Exist");
        }else{
          resetPasswordUserConfirmation(email);
          return resolve("Reset Mail Send Successfully");
        }
      })
  })
  }

  updatePassword(values) {
    return new Promise ((resolve, reject)=> {
      console.log(values);
      saltHashPassword(values.password)
        .then(result => {
          console.log('hash !!!', result);
          return Instructor.findOneAndUpdate({email:values.email}, {$set: { password: result.passwordHash, salt: result.salt}});
        })
        .then(result=> {
          return resolve(result);
        })
        .catch(err=> {
          return reject(err);
        })
    })
  }

}

function getTime(){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  var currentTime = new Date();

  var currentOffset = currentTime.getTimezoneOffset();

  var ISTOffset = 330;   // IST offset UTC +5:30

  var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

  // ISTTime now represents the time in IST coordinates
  return ISTTime;
}

function sendMail(email){
  console.log('$$$$$$$$$',email);
    nodeoutlook.sendEmail({
    auth: nodemailerAuthCredential,
      from:' "OneWater " <OWACODE@onewateracademy.org> ',
      to: email,
      subject: "Profile Approved✔", // Subject line
      text: "Verify your Email for OneWater Instructor",
      html:`
      <h4> Congratulations Hello Welcome to OneWater Learning Academy<h4>
      <p>Your Profile has been approved for Instructor. You can now add new course. Login and Add Your Course.
      `, // html body
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
});
}

function resetPasswordUserConfirmation(email) {
  console.log('$$$$$$$$$', email, token);
  nodeoutlook.sendEmail({
    auth: nodemailerAuthCredential,
    from: ' "OneWater " <OWACODE@onewateracademy.org> ',
    to: email,
    subject: "Reset Password✔", // Subject line
    text: "Reset Password",
    html: `
      <h4>Reset Password For Instructor<h4>
      <p>Click on the link to Reset Your Password <a href="https://onewater.herokuapp.com/onewater/recover-password/` + token + `">https://onewater.herokuapp.com/onewater/recover-password/` + token + `
      </a>`, // html body
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
  });
}

//  ################################# Crypto Salt Hash Functions Start ###############################
var genRandomString = function (length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length);   /** return required number of characters */
};

var sha512 = function (password, salt) {
  var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt: salt,
    passwordHash: value
  };
};

function saltHashPassword(userpassword) {
  console.log('salthash hit')
  var salt = genRandomString(16); /** Gives us salt of length 16 */
  var passwordData = sha512(userpassword, salt);
  console.log('UserPassword = ' + userpassword);
  console.log('Passwordhash = ' + passwordData.passwordHash);
  console.log('nSalt = ' + passwordData.salt);

  return new Promise((resolve, reject) => {
    resolve(passwordData);
  })
}
//  ################################# Crypto Salt Hash Function Ends ###############################


module.exports= new UpdateController();
