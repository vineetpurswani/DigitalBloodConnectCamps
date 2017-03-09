/**
 * Created by fachika on 20/2/17.
 */
var csv = require('fast-csv');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var CONSTANTS = require('./../bin/CONSTANTS');

router.get('/', function(req, res) {
  var camp_id = req.query.camp_id;
  if (camp_id == undefined) {
    res.redirect('/');
    return;
  }

  var csvfilename = CONSTANTS.csvdir + 'response_'+camp_id+'.csv';

    // Setup some vars
    var json = {},
        first = true;

    // Read the file from the upload [3]
    fs.readFile(csvfilename, function (err, content) {
        console.log(err);
        // Create the scv parser [4]
        csv

        // Define the CSV source [5]
            .fromString('' + content)

            // Listen for a record event [6]
            .on('data', function (row, index) {

                // If it is the first row, assume it is the headers [7]
                if (first) {
                    json.headers = row;
                    json.data = [];
                    first = false;
                } else {
                    // [8]
                    json.data.push(row);
                }

                // On end, return the data [9]
            }).on('end', function () {

            // Make sure the server send the right headers [10]
            // res.writeHead(200, {'Content-Type': 'text/html'});
            // Send the json data [11]
            res.render('csvviewer', {data: json, title: 'Response Sheet'});

        });

    });

});

module.exports = router;