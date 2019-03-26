// Load the module dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define a new 'UserSchema'
const RegistrationSchema = new Schema({
    student: {type : mongoose.Schema.Types.ObjectId, ref: 'Students', index: true, trim : true},
    course:  {type : mongoose.Schema.Types.ObjectId, ref: 'Courses' , index: true, trim : true}
    
});
mongoose.model('Registrations', RegistrationSchema);

RegistrationSchema.methods.addRegistration = function (courseId, studentId) {
    this.student = studentId;
    this.course = courseId;
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

RegistrationSchema.methods.findRegistrationsByCourses = function(courseId) {
  if(courseId==null) return null;
  this.find({course:courseId}).exec((err, registrations) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      return registrations;
    }
  });
};

// Create the 'Student' model out of the 'UserSchema'