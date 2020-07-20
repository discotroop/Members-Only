var express = require('express');
var router = express.Router();
let member_controller = require('../controllers/memberController');

/* GET home page. */
router.get('/', member_controller.index);

router.get('/sign-up', member_controller.member_create_get);

router.post('/sign-up', member_controller.member_create_post);






module.exports = router;