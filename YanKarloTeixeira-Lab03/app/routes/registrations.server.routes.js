// Load the 'students' controller
const registrations = require('../controllers/registrations.server.controller');
const passport = require('passport');

// Define the routes module' method
module.exports = function (app) {
    app.get('/AddRegistrationForm', registrations.render);

    app.route('/CreateRegistration')
        .post(registrations.create);



};