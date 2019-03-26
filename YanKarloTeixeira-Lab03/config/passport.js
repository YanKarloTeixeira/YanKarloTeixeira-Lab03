// Load the module dependencies
const passport = require('passport');
const mongoose = require('mongoose');

// Define the Passport configuration method
module.exports = function() {
	// Load the 'Student' model
	const Student = mongoose.model('Students');
	
	// Use Passport's 'serializeUser' method to serialize the user id
	passport.serializeUser((student, done) => {
		done(null, student.id);
	});

	// Use Passport's 'deserializeUser' method to load the user document
	passport.deserializeUser((id, done) => {
		Student.findOne({
			_id: id
		}, '-password -salt', (err, student) => {
			done(err, student);
		});
	});

	// Load Passport's strategies configuration files
	require('./strategies/local.js')();
	require('./strategies/twitter.js')();
	require('./strategies/facebook.js')();
	require('./strategies/google.js')();
};