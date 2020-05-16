//  MongoDB Models
const Instructor = require('../../model/instructor');
const RegisteredInstructor = require('../../model/registered_instructor');
const Course = require('../../model/course');
const Candidate = require('../../model/candidates');
const RegisteredDrawing = require('../../model/registered_drawing');

// Controllers
const deleteController = require('./delete');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodeoutlook = require('nodejs-nodemailer-outlook');
const nodemailerAuthCredential = {
  user: "OWACODE@onewateracademy.org",
  pass: "Panda@21"
}
let token;
class AdderOperationController {

  addNewInstructor(values) {
    token = jwt.sign({ email: values.email }, '@@@#%&$ve%*(tok???//---==+++!!!e!!n)@rify@@@@');
    return new Promise((resolve, reject) => {
      saltHashPassword(values.password)
        .then(result => {
          const instructor = new Instructor({
            name: values.name,
            email: values.email,
            password: result.passwordHash,
            salt: result.salt,
            verified: false,
            form_filled: false,
            token: token,
            status: 'pending',
            mobile_no: null,
            nationality: null,
            profession: null,
            linkedIn: null,
            date_added: getTime(),
            instructor_no: 0
          })

          instructor.save()
            .then(result => {
              verifyUser(values.email);
              resolve(result)
            })
            .catch(err => { reject(err) });
        })
    })
  }

  addRegisteredInstructor(values) {
    return new Promise((resolve, reject) => {
      const instructor = new RegisteredInstructor({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        organization: values.organization,
        mobile_no: values.mobile_no,
        category: values.category,
        proposed_course_topic: values.proposed_course_topic,
        course_type: values.course_type,
        proposed_course_title: values.proposed_course_title,
        proposed_desc: values.proposed_desc,
        instructor_no: 0,
        date_added: getTime()
      })

      instructor.save()
        .then(result => {
          registerMail(values.email);
          resolve(result)
        })
        .catch(err => { reject(err) });
    })
  }

  addNewCourse(values) {
    console.log(values, 'new course')
    return new Promise((resolve, reject) => {

      const course = new Course({
        userid: values.id,
        useremail: values.email,
        title: values.title,
        content_link: values.content_link,
        category: values.category,
        status: 'pending',
        date_approved: null,
        date_added: getTime(),
        course_no: 0
      })
      course.save()
        .then(result => resolve(result))
        .catch(err => reject(err));
    })
  }

  addNewCandidate(values) {
    return new Promise((resolve, reject) => {
      const candidate = new Candidate({
        name: values.name,
        location: values.location,
        profile_description: values.profile_description,
        email: values.email,
        linked_In: values.linked_In,
        experience: values.experience,
        profile_image: values.profile_image,
        gender: values.gender,
        intrested_fields: values.intrested_fields,
        qualification: values.qualification,
        resume: values.resume,
        jobs_applied: [],
        date_added: getTime(),
        candidate_no: 0
      })

      candidate.save()
        .then(result => { resolve(result) })
        .catch(err => { reject(err) });
    })
  }

  verifyMail(values) {
    return new Promise((resolve, reject) => {
      Instructor.find({ token: values.token })
        .then(result => {
          if (!result) {
            return reject("Invalid Token");
          }
          const verification_result = jwt.verify(values.token, '@@@#%&$ve%*(tok???//---==+++!!!e!!n)@rify@@@@');
          const user = verification_result.email;
          console.log(user);
          Instructor.findOneAndUpdate({ email: user }, { $set: { verified: true } })
            .then(result => {
              console.log(result, 'User Verified');
              return resolve(result);
            })

        })
    })
  }

  // Login Function
  login(userdata) {
    return new Promise((resolve, reject) => {
      console.log(userdata, 'iih');
      Instructor.find({ email: userdata.email })
        .then(result => {
          console.log('%%%%%%%', result)
          if (result.length == 0) {
            return resolve('No User Found');
          }
          const passdata = sha512(userdata.password, result[0].salt);
          if (result[0].password !== passdata.passwordHash) {
            return resolve("Incorrect Password");
          }
          if (result[0].verified == false) return resolve("User Email not Verified");
          const token = jwt.sign({ email: result[0].email, userid: result[0]._id }, '%%%$$#book!*!(se!!ing^^&min%$#*)((//or'
          )
          resolve({ token: token, user: result[0], form_filled: result[0].form_filled, status: result[0].status });
        })
    })
  }

  drawing(values) {
    return new Promise((resolve, reject)=>{
      const drawing = new RegisteredDrawing({
        firstname: values.firstname,
        lastname: values.lastname,
        organization: values.organization,
        email: values.email,
        candidate_no:0,
        date_registered:getTime()
      })
      drawing.save()
      .then(result=> {
        registerDrawingMail(values.email);
        return resolve(result);
      })
      .catch(err=> {
        return reject(err);
      })
    })
  }

}


function getTime() {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  var currentTime = new Date();

  var currentOffset = currentTime.getTimezoneOffset();

  var ISTOffset = 330;   // IST offset UTC +5:30

  var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

  // ISTTime now represents the time in IST coordinates
  return ISTTime;
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

function verifyUser(email) {
  console.log('$$$$$$$$$', email, token);
  nodeoutlook.sendEmail({
    auth: nodemailerAuthCredential,
    from: ' "OneWater " <OWACODE@onewateracademy.org> ',
    to: email,
    subject: "Verify Account✔", // Subject line
    text: "Verify your Email for OneWater Instructor",
    html: `
      <h4>Hello Welcome to OneWater Learning Academy<h4>
      <p>Click on the link to Verify Your Account for Instructor <a href="https://onewater-instructor-api.herokuapp.com/activate/` + token + `">https://onewater-instructor-api.herokuapp.com/activate/` + token + `
      </a>
      `, // html body
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
  });
}

function registerMail(email) {
  nodeoutlook.sendEmail({
    auth: nodemailerAuthCredential,
    from: ' OneWater Academy <OWACODE@onewateracademy.org> ',
    to: email,
    subject: "Registered Successfully", // Subject line
    text: "Verify your Email for OneWater Instructor",
    html: `
      <p> Hello!
      <br>
        Thank you for expressing your interest in offering your expertise as a OneWater instructor. We will get in touch with you and schedule a time to discuss specifics about your interest within two business days.
        <br>
        Should you need to reach out in the meantime, please feel free to send us an email at instructors@onewateracademy.org.
        <br>

        The Team at OneWater Academy
      </p>
      `, // html body
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
  });
}

function registerDrawingMail(email) {
  nodeoutlook.sendEmail({
    auth: nodemailerAuthCredential,
    from: ' OneWater Academy <OWACODE@onewateracademy.org> ',
    to: email,
    subject: "Course Instructor Interest    ", // Subject line
    html: `
      <h4>Hello Welcome to OneWater Learning Academy<h4>
      <p> You have Register Successfully for Drawing
      </p>
      `, // html body
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
  });
}
module.exports = new AdderOperationController();

