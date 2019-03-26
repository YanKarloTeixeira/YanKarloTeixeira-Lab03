// Load the 'students' controller
const courses = require("../../app/controllers/courses.server.controller");
const passport = require("passport");

// Define the routes module' method
module.exports = function(app) {
  app
    .route("/createCourse")
    .get(courses.render)
    .post(courses.createCourse);

  app.route("/coursesList").get(courses.coursesList);

  app.route("/readCourse/:courseCode").post(courses.readCourse);
  app.route("/updateCourse/:courseCode").put(courses.updateCourse);
  app.param("courseCode", courses.courseByCourseCode);

  app.route("/deleteCourse/:courseCode").get(courses.StudentsByCourseCode);
};
