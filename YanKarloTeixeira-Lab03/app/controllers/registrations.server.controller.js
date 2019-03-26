const mongoose = require("mongoose");
const Registrations = mongoose.model("Registration");
const Courses = mongoose.model("Course");
const Students = mongoose.model("Student");
const passport = require("passport");



// Registrations.create({
//   course: "5c9417ce987cde1ee04f9368",
//   student: "5c9412bbd486ab3df847b9d7"
// });
// Registrations.create({
//   course: "5c9417d8987cde1ee04f9369",
//   student: "5c9412bbd486ab3df847b9d7"
// });
// Registrations.create({
//   course: "5c9417e2987cde1ee04f936a",
//   student: "5c9412bbd486ab3df847b9d7"
// });
// Registrations.create({
//   course: "5c9417eb987cde1ee04f936b",
//   student: "5c9412bbd486ab3df847b9d7"
// });

exports.render = function (req, res) {
  // Use the 'response' object to render the 'index' view with a 'title' and 'userFullName' properties
  res.render("AddRegistration", { title: "Creating a New Registration" });
};
exports.renderRegistratioByCourseCode = function (req, res) {
  // Use the 'response' object to render the 'index' view with a 'title' and 'userFullName' properties
  res.render("RegistrationByCourse", { title: "" });
};
function getErrorMessage(err) {
  Registrations.a
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return "Unknown server error";
  }
}

exports.createRegistration = function (req, res) {
  const registration = new Registrations(req.body);

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

exports.registrationsByStudent = function (req, res, studentNumber) {
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

exports.registrationsByCourse = function (req, res, next) {
  console.log('courseCode :', req.body.courseCode);
  const course = new Courses(courseIdByCourseCode(req.body.courseCode));
  console.log('courseId :', course._id);
  Registrations.find({ course: course._id },(err, students) => {
    console.log('students :', students);
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      console.log("=========================" + students);
      res.status(200).json(students);
    }

  });

}


function courseIdByCourseCode(courseCode) {


  Courses.findOne(
    { courseCode: courseCode },
    (err, course) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        return course;
      }
    });

};


exports.registrationsByCourse2 = function (req, res, next) {
  const students = {};

  Registrations.find({ courseCode: req.body.courseCode }).exec(
    (err, registrations) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        registrations.forEach(registration => {
          Students.findOne({ studentNumber: registration.studentNumber }).exec(
            (err, student) => {
              if (!err) {
                students.push(student);
              }
            }
          );
        });
        // students.forEach(students2 => {
        //   console.log(students2.studentNumber);
        // });
        console.log("=========================" + students);
        res.status(200).json(students);
      }
    }
  );
};

function findRegistrations(courseCode) {
  return Registrations.find({ courseCode: courseCode });
}
//
exports.read = function (req, res) {
  res.status(200).json(req.registration);
};
//
exports.update = function (req, res) {
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
exports.delete = function (req, res) {
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
exports.hasAuthorization = function (req, res, next) {
  if (req.registration.creator.id !== req.user.id) {
    return res.status(403).send({
      message: "User is not authorized"
    });
  }
  next();
};
