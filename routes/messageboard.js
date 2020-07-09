var express = require('express');
var router = express.Router();
let member_controller = require('../controllers/memberController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sign-up', member_controller.member_create_get);

router.post('/sign-up', member_controller.member_create_post);






module.exports = router;