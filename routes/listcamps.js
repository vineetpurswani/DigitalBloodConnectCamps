/**
 * Created by fachika on 8/3/17.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var CONSTANTS = require('./../bin/CONSTANTS');
var request = require('request');
var querystring = require('querystring');

function call(method, rest_data, url, callback) {
  var data = {
    method: method,
    input_type: "JSON",
    response_type: "JSON",
    rest_data: JSON.stringify(rest_data)
  };

  request.post({
      uri: url,
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      body: querystring.stringify(data)
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body)
      }
    }
  );
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var rest_data = {
    "user_auth": {
      "user_name" : CONSTANTS.crm_username,
      "password"  : CONSTANTS.crm_password,
      "encryption"  : "PLAIN"
    },
    "application": "request_update",
    "name_value_list": []
  };

  call("login", rest_data, CONSTANTS.crm_url, function(response) {
    response = JSON.parse(response);
    var rest_data = {
      "session": response.id,
      "module_name": "bc_Camps",
      // "select_fields": ["name", "camp_date", "organizers_name"],
      // "query": "camp_date >= CURDATE()",
      // "order_by": "camp_date asc",
      "max_results": 20,
      "deleted": 0
    };
    call("get_entry_list", rest_data, CONSTANTS.crm_url, function(response) {
      // console.log(response);
      res.render('listcamps', {data: JSON.parse(response), title: 'Upcoming Camps'});
    });
  });
});

module.exports = router;
