let async = require('async');
let Member = require('../models/member')
let Message =require('../models/message')
const express=require('express');

const { body } = require('express-validator')

exports.index = function(req, res) {
    async.parallel({
        // count items in store
        message_count: function (callback) {
            Message.countDocuments({}, callback);
        },
        // count types in store
        member_count: function(callback) {
            Member.countDocuments({}, callback);
        },
    }, function(err, results) {
        // render index page and pass in results as data.
        res.render('index', {title: 'Members Only',
         error: err,
         data: results
        });
    });
};

exports.member_create_get = function (req, res, next) {
    res.render('signUp');
}

exports.member_create_post = [
    // field clean up and validation:
    // add email validation!
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

            member.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/')
            });
    }
];
