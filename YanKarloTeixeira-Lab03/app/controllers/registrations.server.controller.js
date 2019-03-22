const mongoose = require('mongoose');
const Registrations = mongoose.model('Registration');
const passport = require('passport');


function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.render = function (req, res) {
    // Use the 'response' object to render the 'index' view with a 'title' and 'userFullName' properties
    res.render('AddRegistration', { title: 'Registering a Student' });
};
//
exports.create = function (req, res) {
    const registration = new Registrations(req.body);

    registration.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(registration);
        }
    });
};
//
exports.CoursesByStudents = function (req, res,CoursesId) {
    Registrations.find().exec((err, registrations) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(registrations);
        }
    });
};

exports.StudentsByCourses = function (req, res, StudentId) {
    Registrations.find().exec((err, registrations) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(registrations);
        }
    });
};

exports.registrationByID = function (req, res, next, id) {
    //Registration.findById(id).populate('creator', 'firstName lastName fullName').exec((err, registration) => {
    Registrations.findById(id).exec((err, registration) => {
        if (err) return next(err);
        if (!registration) return next(new Error('Failed to load registration '
            + id));
        req.registration = registration;
        next();
    });
};
//
exports.read = function (req, res) {
    res.status(200).json(req.registration);
};
//
exports.update = function (req, res) {
    const registration = req.registration;
    registration.title = req.body.title;
    registration.content = req.body.content;
    registration.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(registration);
        }
    });
};
//
exports.delete = function (req, res) {
    const registration = req.registration;
    registration.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(registration);
        }
    });
};
//The hasAuthorization() middleware uses the req.registration and req.user objects
//to verify that the current user is the creator of the current registration
exports.hasAuthorization = function (req, res, next) {
    if (req.registration.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};


