var express = require('express');
var router = express.Router();
var fs = require('fs');
var CONSTANTS = require('./CONSTANTS');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Donor Form', headers:  CONSTANTS.headers});
});


router.post('/submit', function(req, res) {
    data = '';
    for (var i in CONSTANTS.headers) {
        var header = CONSTANTS.headers[i];
        data += req.body[header.toLowerCase()]+', ';
    }
    data = data.slice(0,-2) +'\n';
    if (!fs.existsSync(CONSTANTS.csvfilename)) {
        data = CONSTANTS.headers.join(',') + '\n' + data;
    }
    fs.appendFile(CONSTANTS.csvfilename, data, function (err) {
        throw err;
    });
    res.render('submit', {title: 'Submission Successful'});
});

module.exports = router;
