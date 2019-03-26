// Load the module dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define a new 'UserSchema'
const RegistrationSchema = new Schema({
    student: {type : mongoose.Schema.Types.ObjectId, ref: 'Student'},
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
    
});

RegistrationSchema.methods.addRegistration = function (courseId, studentId) {
    this.course = courseId;
    this.student = studentId;
    this.save(err => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(this);
        }
    });
};

// Create the 'Student' model out of the 'UserSchema'
mongoose.model('Registration', RegistrationSchema);