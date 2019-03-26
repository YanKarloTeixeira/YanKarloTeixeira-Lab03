// Load the 'students' controller
const registrations = require("../controllers/registrations.server.controller");
const courses = require("../controllers/courses.server.controller");
const students = require("../controllers/students.server.controller");
const passport = require('passport');

// Define the routes module' method
module.exports = function (app) {

    
    // app.route("/listRegistrationByStudent")
    // app.route("/listRegistrationByCourse")
    app.route("/createRegistration")
    .get(registrations.render)
    .post(registrations.createRegistration);

    app
      .route("/registrationsByCourse2")
      .get(registrations.renderRegistratioByCourseCode);

      app.route("/registrationsByCourse")
        .post(registrations.registrationsByCourse);
    // app.param("courseCode", courses.courseByCourseCode);

    // app.route("/deleteRegistrationByStudent")
    //     .delete();
    // app.route("/deleteRegistrationByCourse")
    //     .delete();

    // app.route("/deleteRegistration").delete();
    // app.route("/updateRegistration").post();
    // app.route("/deleteCourse/:courseCode").get(courses.StudentsByCourseCode);
};


