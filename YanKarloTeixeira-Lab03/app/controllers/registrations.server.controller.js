const mongoose = require("mongoose");
const Registrations = mongoose.model("Registrations");
const Courses = mongoose.model("Courses");
const Students = mongoose.model("Students");
const passport = require("passport");
const q = require("q");



// Registrations.create({
//   course: "5c9ab81cdd219723087436af",
//   student: "5c9ab976f0b8423c309634c2"
// });
// Registrations.create({
//   course: "5c9ab832dd219723087436b0",
//   student: "5c9ab976f0b8423c309634c2"
// });
// Registrations.create({
//   course: "5c9ab846dd219723087436b1",
//   student: "5c9ab976f0b8423c309634c2"
// });
// Registrations.create({
//   course: "5c9ab858dd219723087436b2",
//   student: "5c9ab976f0b8423c309634c2"
// });

exports.render = function(req, res) {
  // Use the 'response' object to render the 'index' view with a 'title' and 'userFullName' properties
  res.render("AddRegistration", { title: "Creating a New Registration" });
};
exports.renderRegistratioByCourseCode = function(req, res) {
  // Use the 'response' object to render the 'index' view with a 'title' and 'userFullName' properties
  res.render("RegistrationByCourse", { title: "" });
};
function getErrorMessage(err) {
  Registrations.a;
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    console.log("err :", err.errors);
    return "Unknown server error";
  }
}

exports.create = function(req, res) {
  const registration = new Registrations();
  const student = new Students(req.user);
  if(!req.user) return null;
  Courses.findOne({ courseCode: req.body.courseCode }, function(err,course) {
    if (err || course==null) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      req.courseId = course.id;
      console.log("req.courseId :", req.courseId);
    }
  }).then(function(){
        registration.course = req.courseId;
        registration.student = student.id;
        console.log('registration :', registration);
        registration.save();
    });
};
//
exports.registrationsByStudent = function(req, res, studentNumber) {
  const student = new Students(req.user); 
      Registrations.find({ student: student.id })
        .populate("course")
        .exec((err, registrations) => {
          if (err) {
            return res.status(400).send({
              message: getErrorMessage(err)
            });
          } else {
            req.registrations = registrations;
            console.log("========registrations :" + registrations);
            res.status(200).json(req.registrations);
          }
        });
};

exports.registrationsByCourse = function(req, res, next) {
  console.log("courseCode :", req.body.courseCode);
  Courses.findOne({courseCode: req.body.courseCode}, function(err, course){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      req.courseId = course.id;
      console.log('req.courseId :', req.courseId);

    }
  })
  .then(function(){
    Registrations.find({ course: req.courseId }).populate('student').exec((err, registrations) =>{
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        req.registrations = registrations;
        console.log("========registrations :" + registrations);
        res.status(200).json(req.registrations);
      }
    });
  });
}
//
exports.read = function(req, res) {
  res.status(200).json(req.registration);
};
//
exports.update = function(req, res) {
  const registration = req.registration;
  registration.title = req.body.title;
  registration.content = req.body.content;
  registration.save(err => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(registration);
    }
  });
};
//
exports.delete = function(req, res) {
  const courseCode = req.body.courseCode;
  const student = new Students(req.user)
  Courses.findOne({courseCode: courseCode},
    function(err, course){
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        req.courseId = course.id;
      }
  
    })
    .then(function(){
        Registrations.findOneAndDelete({course:req.courseId, student: student.id})
  })
  // registration.remove(err => {
  //   if (err) {
  //     return res.status(400).send({
  //       message: getErrorMessage(err)
  //     });
  //   } else {
  //     res.status(200).json(registration);
  //   }
  // });
};
//The hasAuthorization() middleware uses the req.registration and req.user objects
//to verify that the current user is the creator of the current registration
exports.hasAuthorization = function(req, res, next) {
  if (req.registration.creator.id !== req.user.id) {
    return res.status(403).send({
      message: "User is not authorized"
    });
  }
  next();
};
