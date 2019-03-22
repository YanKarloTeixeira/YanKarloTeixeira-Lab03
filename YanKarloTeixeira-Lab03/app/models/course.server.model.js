// Load the module dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new 'UserSchema'
const CourseSchema = new Schema({
    courseCode: {
        type: String,
        unique: true,
        required: 'Course Code is required',
        // Trim the 'StudentNumber' field
        trim: true
    },
    courseName: {
        type: String,
        unique: true,
        required: 'Course Name is required',
        // Trim the 'StudentNumber' field
        trim: true
    },
    section: String,
    semester: String,
 });

//CourseSchema.methods.StudentsByCourse = function (courseId) {
//    console.log("*****************************************************    StudentsByCourse");
//    Student.aggregate([
//        {
//            $lookup:
//            {
//                from: 'registrations',
//                localField: '_id',
//                foreignField: 'CourseId',
//                as: 'students'
//            }
//        }
//    ]).toArray(function (err, res) {
//        if (err) throw err;
//        console.log(JSON.stringify(res));
//        db.close();
//    });

//};



// Create the 'Student' model out of the 'UserSchema'
mongoose.model('Course', CourseSchema);