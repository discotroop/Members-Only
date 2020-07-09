var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sign-up', function(req, res, next) {
  res.render('signUp', { title: 'Test' });
});




// // GET request for creating a user. NOTE This must come before routes that display users (uses id).
// router.get('/item/create', item_controller.item_create_get);

// // POST request for creating item.
// router.post('/', item_controller.item_create_post);





module.exports = router;