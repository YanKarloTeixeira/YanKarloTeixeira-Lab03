const mongoose = require("mongoose");
const Registrations = mongoose.model("Registrations");
const Courses = mongoose.model("Courses");
const Students = mongoose.model("Students");
const passport = require("passport");
const q = require("q");

// Registrations.create({
//   course: "5c9a74d43d21854614b8daff",
//   student: "5c9a74c63d21854614b8dafe"
// });
// Registrations.create({
//   course: "5c9a74e03d21854614b8db00",
//   student: "5c9a74c63d21854614b8dafe"
// });
// Registrations.create({
//   course: "5c9a74f03d21854614b8db01",
//   student: "5c9a74c63d21854614b8dafe"
// });
// Registrations.create({
//   course: "5c9a75023d21854614b8db02",
//   student: "5c9a74c63d21854614b8dafe"
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

exports.createRegistration = function(req, res) {
  const registration = new Registrations();
  const reg = new Registrations();
  const course = new Courses();
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  var query = Courses.find({ courseCode: "5c9417ce987cde1ee04f9368" }, function(err, reg){ return reg;}).then();
  // assert.ok(!(query instanceof Promise));
  
  
  var promisse = query;
  // assert.ok(promisse instanceof Promise);
  var query1 = promisse.then(function(err,doc) {
    console.log("Esse eh o doc :" + doc);
    return doc;
  });
  
  console.log('query1 :', query1);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  Courses.findOne({ courseCode: req.body.courseCode }, function(err, course) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      console.log("courseCode :", req.body.courseCode);
      console.log("req.body.studentNumber :", req.body.studentNumber);
      
      Students.findOne({ studentNumber: req.body.studentNumber }, function(
        err,
        student
        ) {
          if (err) {
            return res.status(400).send({
              message: getErrorMessage(err)
          });
        } else {
          registrations.course = course.id;
          registration.student = student.id;
          console.log("course :", registration.course);
          console.log("student :", registration.student);
          registration.save();
        }
      }).then();
    }
  });

  console.log("courseId :", findCourse(req.body.courseCode));

  // findCourseId(req.body.courseCode)
  // registration.course = courseId;
  // console.log("registration created like that -------:", registration);
  // registration.save(err => {
  //   if (err) {
  //     return res.status(400).send({
  //       message: getErrorMessage(err)
  //     });
  //   } else {
  //     res.status(200).json(registration);
  //   }
  // });
};
//

exports.registrationsByStudent = function(req, res, studentNumber) {
  const courses = {};
  Registrations.find({ studentNumber: req.body.studentNumber }).exec(
    (err, registrations) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        registrations.forEach(registration => {
          Courses.findOne({ courseCode: registration.courseCode }).exec(
            (err, course) => {
              if (!err) {
                courses.push(Course(course));
              }
            }
          );
        });
        res.status(200).json(courses);
      }
    }
  );
};

exports.registrationsByCourse = function(req, res, next) {
  console.log("courseCode :", req.body.courseCode);
  var myCourse;
  var students = {};
  // console.log('Function value returned for courseId :', course);
  // course = findCourse(req.body.courseCode);
  // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@course :',course);
  // Courses.findOne({ courseCode: req.body.courseCode }, (err, Course) => {
  //   if (err) {
  //     return res.status(400).send({
  //       message: getErrorMessage(err)
  //     });
  //   } else {

  //     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!course :', course);
  //     // Registrations.find({ course: course.id }).populate('student').exec((err, registrations) => {
  //       next();
  //     }
  //   });
  // var d = q.defer();
  // Courses.findOne({courseCode: req.body.courseCode}).exec((err, course)=>{
  //   console.log('------course :', course);

  // Registrations.find({ course: '5c9417ce987cde1ee04f9368' }).exec((err, registrations) => {
  Registrations.find({ course: "111" }, function(err, registrations) {
    //console.log('++++++++course :', course.id);
    console.log("========registrations :" + registrations);
  });
  //   d.resolve(course);
  // });

  // myCourse = d.promise;
  // console.log("Functio returning course.id :", myCourse.id);
  // Registrations.find({ "course": myCourse.id },
  // ((err, registrations) => {
  //   if (err) {
  //     return res.status(400).send({
  //       message: getErrorMessage(err)
  //     });
  //   } else {
  //     console.log('registrations :', registrations);
  //     res.status(200).json(registrations);
  //   }
  // }));
};

function findCourse(courseCode) {
  var d = q.defer();
  Courses.findOne({ courseCode: courseCode }, (err, course) => {
    d.resolve(course);
  });
  return d.promise;
}

// exports.registrationsByCourse = function(req, res, next) {
//   console.log("courseCode :", req.body.courseCode);
//   var course;
//   var students={};
//   // console.log('Function value returned for courseId :', course);
//   Courses.findOne({ courseCode: req.body.courseCode }, (err, course) => {
//     if (err) {
//       return res.status(400).send({
//         message: getErrorMessage(err)
//       });
//     } else {
//       console.log("Functio returning course.id :", course.id);
//       course = course.id;
//     }
//   }).then(function(course) {
//     // course = course.id;
//     Registrations.find({ course: course.id }, (err, registrations) => {
//       if (err) {
//         return res.status(400).send({
//           message: getErrorMessage(err)
//         });
//       } else {
//         registrations.forEach(registration => {
//           console.log('registration.student :', registration.student);
//           Students.findOne({
//             _id: registration.student
//           }).exec((err, student) => {
//             if (!err) {
//               console.log('student looping:', student);
//               students.push(student);
//               next();
//             }
//           });
//           console.log(
//             "=========================STUDENT RAIZ =====> " + students
//           );
//           res.status(200).json(students);
//         });
//       }
//     });
//   });
// };
//   // Registrations.find(
//   //   { course: "5c9417ce987cde1ee04f9368" },
//   //   (err, students) => {
//   //     if (err) {
//   //       return res.status(400).send({
//   //         message: getErrorMessage(err)
//   //       });
//   //     } else {
//   //       console.log("=========================" + students);
//   //       res.status(200).json(students);
//   //     }
//   //   }
//   // );
// };

// exports.findCourseIdByCourseCode = function (req, res, courseCode) {
//   Courses.findOne({ courseCode: courseCode }, (err, course) => {
//     if (err) {
//       return res.status(400).send({
//         message: getErrorMessage(err)
//       });
//     } else {
//       console.log("Functio returning course.id :", course.id);
//       req.body.course;
//     }
//   });
// };

// exports.registrationsByCourse2 = function (req, res, next) {
//   const students = {};

//   Registrations.find({ courseCode: req.body.courseCode }).exec(
//     (err, registrations) => {
//       if (err) {
//         return res.status(400).send({
//           message: getErrorMessage(err)
//         });
//       } else {
//         registrations.forEach(registration => {
//           Students.findOne({ studentNumber: registration.studentNumber }).exec(
//             (err, student) => {
//               if (!err) {
//                 students.push(student);
//               }
//             }
//           );
//         });
//         // students.forEach(students2 => {
//         //   console.log(students2.studentNumber);
//         // });
//         console.log("=========================" + students);
//         res.status(200).json(students);
//       }
//     }
//   );
// };

// function findRegistrations(courseCode) {
//   return Registrations.find({ courseCode: courseCode });
// }
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
  const registration = req.registration;
  registration.remove(err => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(registration);
    }
  });
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
