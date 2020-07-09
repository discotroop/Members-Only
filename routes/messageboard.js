var express = require('express');
var router = express.Router();
let member_controller = require('../controllers/memberController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sign-up', member_controller.member_create_get);



// // GET request for creating a user. NOTE This must come before routes that display users (uses id).
// router.get('/item/create', item_controller.item_create_get);

// // POST request for creating item.
// router.post('/', item_controller.item_create_post);





module.exports = router;