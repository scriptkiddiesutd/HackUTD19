var express = require('express');
var router = express.Router();

/* GET userlist. */
router.get('/carlist', function(req, res) {
  var db = req.db;
  var collection = db.get('carList');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

/* POST to adduser. */
router.post('/addcar', function(req, res) {
  var db = req.db;
  var collection = db.get('carList');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});
module.exports = router;