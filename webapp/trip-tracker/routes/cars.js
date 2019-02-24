var express = require('express');
var router = express.Router();

/* GET userlist. */
router.get('/carlist', function(req, res) {
  var db = req.db;
  var collection = db.get('carlist');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

module.exports = router;