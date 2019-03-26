// Load the module dependencies
const Student = require("mongoose").model("Students");
const passport = require("passport");

// Create a new error handling controller method
const getErrorMessage = function(err) {
  // Define the error message variable
  var message = "";

  // If an internal MongoDB error occurs get the error message
  if (err.code) {
    switch (err.code) {
      // If a unique index error occurs set the message error
      case 11000:
      case 11001:
        message = "Username already exists";
        break;
      // If a general error occurs set the message error
      default:
        message = "Something went wrong";
    }
  } else {
    // Grab the first error message from a list of possible errors
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  // Return the message error
  return message;
};

// Create a new controller method that renders the signin page
exports.renderSignin = function(req, res, next) {
  // If user is not connected render the signin page, otherwise redirect the user back to the main application page
  if (!req.user) {
    // Use the 'response' object to render the signin page
    res.render("signin", {
      // Set the page title variable
      title: "Sign-in Form",
      // Set the flash message variable
      messages: req.flash("error") || req.flash("info")
    });
  } else {
    return res.redirect("/");
  }
};

// Create a new controller method that renders the signup page
exports.renderSignup = function(req, res, next) {
  // If user is not connected render the signup page, otherwise redirect the user back to the main application page
  if (!req.user) {
    // Use the 'response' object to render the signup page
    res.render("signup", {
      // Set the page title variable
      title: "Sign-up Form",
      // read the message from flash variable
      badmessage: req.flash("error") //passes the error stored in flash
    });
  } else {
    return res.redirect("/");
  }
};

// Create a new controller method that creates new 'regular' users
exports.signup = function(req, res, next) {
  // If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
  if (!req.user) {
    // Create a new 'Student' model instance
    const user = new Student(req.body);
    console.log(req.body);
    const message = null;

    // Set the user provider property
    user.provider = "local";

    // Try saving the new user document
    user.save(err => {
      // If an error occurs, use flash messages to report the error
      if (err) {
        // Use the error handling method to get the error message
        const message = getErrorMessage(err);
        console.log(err);
        // save the error in flash
        req.flash("error", message); //save the error into flash memory

        // Redirect the user back to the signup page
        return res.redirect("/signup");
      }

      // If the user was created successfully use the Passport 'login' method to login
      req.login(user, err => {
        // If a login error occurs move to the next middleware
        if (err) return next(err);

        // Redirect the user back to the main application page
        
        return res.redirect("/");
      });
    });
  } else {
    return res.redirect("/");
  }
};

// Create a new controller method that creates new 'OAuth' users
exports.saveOAuthUserProfile = function(req, profile, done) {
  // Try finding a user document that was registered using the current OAuth provider
  Student.findOne(
    {
      provider: profile.provider,
      providerId: profile.providerId
    },
    (err, user) => {
      // If an error occurs continue to the next middleware
      if (err) {
        return done(err);
      } else {
        // If a user could not be found, create a new user, otherwise, continue to the next middleware
        if (!user) {
          // Set a possible base username
          const possibleUsername =
            profile.username ||
            (profile.email ? profile.email.split("@")[0] : "");

          // Find a unique available username
          Student.findUniqueUsername(
            possibleUsername,
            null,
            availableUsername => {
              // Set the available user name
              profile.username = availableUsername;

              // Create the user
              user = new Student(profile);

              // Try saving the new user document
              user.save(function(err) {
                // Continue to the next middleware
                return done(err, user);
              });
            }
          );
        } else {
          // Continue to the next middleware
          return done(err, user);
        }
      }
    }
  );
};

// Create a new controller method for signing out
exports.signout = function(req, res) {
  // Use the Passport 'logout' method to logout
  req.logout();

  // Redirect the user back to the main application page
  res.redirect("/");
};

exports.studentsList = function(req, res) {
  Student.find().exec((err, students) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      students.forEach(student => {
        console.log(student);
      });
      res.status(200).json(students);
    }
  });
};
//

exports.readStudent = function(req, res) {
  res.status(200).json(req.student);
};
//
exports.studentByID = function(req, res, next, id) {
  Student.findById(id).exec((err, student) => {
    if (err) return next(err);
    if (!student) return next(new Error("Failed to load student " + id));
    req.student = student;
    next();
  });
};
exports.updateStudent = function(req, res) {
  const student = new Student(req.student);
  student.save(err => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(student);
    }
  });
};
//
exports.deleteStudent = function(req, res) {
  const student = new Student(req.student);
  student.remove(err => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(student);
    }
  });
};
