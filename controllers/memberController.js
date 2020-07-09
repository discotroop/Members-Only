let async = require('async');
let member = require('../models/member')

exports.member_create_get = function (req, res, next) {
    res.render('signUp');
}

