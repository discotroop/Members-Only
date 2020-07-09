let async = require('async');
let member = require('../models/member')

exports.member_create_get = function (req, res, next) {
    res.render('signUp');
}

exports.member_create_post = [
    // field validation:
    body('firstname', 'first name required').trim().isLenght({ min: 3}),
    body('lastname', 'last name required').trim().isLength({ min: 3}),
    body('password', 'password is required').trim().isLength({ min: 6 }),

    // sanitize:
    sanitizeBody('*').escape(),

    (req, res, next) => {
        // catch errors
        const erros = validationResult(req);
        // create new Member 
        let member = new Member({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            password: req.body.password,
            email: req.body.password
        });

        // check for errors
        if (!errors.isEmpty()) {
            res.render('signUp')
        } else {
            // Valid form, submit
            member.save(function (err) {
                if (err) { return next(err); }
                res.redirect('../')
            });
        }
    }
];
