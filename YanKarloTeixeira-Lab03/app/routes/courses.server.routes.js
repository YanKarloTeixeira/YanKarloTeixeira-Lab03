// Load the 'students' controller
const courses = require("../../app/controllers/courses.server.controller");
const passport = require("passport");

// Define the routes module' method
module.exports = function(app) {
  app
    .route("/createCourse")
    .get(courses.render)
    .post(courses.create);

  app.route("/coursesList").get(courses.list);

  app.route("/readCourse").post(courses.read);
  app.route("/updateCourse").put(courses.update);
  //app.param("courseCode", courses.courseByCourseCode);

  app.route("/deleteCourse").get(courses.delete);
};
