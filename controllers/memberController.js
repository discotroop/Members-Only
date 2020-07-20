let async = require('async');
let Member = require('../models/member')
const express=require('express');

const { body } = require('express-validator')

exports.member_create_get = function (req, res, next) {
    res.render('signUp');
}

exports.member_create_post = [
    // field validation:
    body('firstname', 'first name required')
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 3})
    .escape(),
    body('lastname', 'last name required')
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 3})
    .escape(),
    body('password', 'password is required')
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 3})
    .escape(),

    (req, res, next) => {

        // create new Member 
        let member = new Member({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            password: req.body.password,
            email: req.body.password
        });
        console.log(member);

        // check for errors
        // if (!errors.isEmpty()) {
        //     res.render('signUp')
        // } else {
            // Valid form, submit
            member.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/')
            });
        // }
    }
];
