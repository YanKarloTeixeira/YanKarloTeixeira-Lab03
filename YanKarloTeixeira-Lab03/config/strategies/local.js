// Load the module dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Student = require('mongoose').model('Students');

// Create the Local strategy configuration method
module.exports = function() {
    // Use the Passport's Local strategy 
    passport.use(new LocalStrategy({ usernameField: 'studentNumber', passwordField:'password' }, function (studentNumber, password, done) {
		// Use the 'Student' model 'findOne' method to find a user with the current studentNumber
		Student.findOne({
			studentNumber: studentNumber
		}, (err, student) => {
			// If an error occurs continue to the next middleware
			if (err) {
				return done(err);
			}
			
			// If a user was not found, continue to the next middleware with an error message
			if (!student) {
				return done(null, false, {
					message: 'Unknown user'
				});
			}

			// If the passport is incorrect, continue to the next middleware with an error message
			if (!student.authenticate(password)) {
				return done(null, false, {
					message: 'Invalid password'
				});
			}
			
			// Otherwise, continue to the next middleware with the user object
		return done(null, student);
		});
	}));
};