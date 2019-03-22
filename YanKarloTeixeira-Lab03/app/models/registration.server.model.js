// Load the module dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define a new 'UserSchema'
const RegistrationSchema = new Schema({
    studentNumber: String,
    courseCode: String
    
});

// Create the 'Student' model out of the 'UserSchema'
mongoose.model('Registration', RegistrationSchema);