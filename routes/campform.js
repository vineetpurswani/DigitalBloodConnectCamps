var express = require('express');
var router = express.Router();
var fs = require('fs');
var CONSTANTS = require('./../bin/CONSTANTS');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.camp_id == undefined) {
    res.redirect('/');
    return;
  }
  res.render('campform', { title: 'Donor Form', headers: CONSTANTS.headers, camp_id: req.query.camp_id});
});

router.post('/submit', function(req, res) {
    var data = '';
    var camp_id = req.body.camp_id;
    var csvfilename = CONSTANTS.csvdir + 'response_'+camp_id+'.csv';
    delete req.body.camp_id;

    for (var i in CONSTANTS.headers) {
        var header = CONSTANTS.headers[i];
        data += req.body[header.toLowerCase()]+', ';
    }
    data = data.slice(0,-2) +'\n';
    if (!fs.existsSync(csvfilename)) {
        data = CONSTANTS.headers.join(',') + '\n' + data;
    }
    fs.appendFile(csvfilename, data, function (err) {
      if (err != null)
        throw err;
    });
    res.render('submit', {title: 'Submission Successful'});
});

module.exports = router;
