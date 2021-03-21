var express = require('express');
var router = express.Router();
var axios = require('axios')
var bodyParser = require('body-parser');
var CryptoJS = require("crypto-js");

// create application/json parser
//var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const loginService = ({ last_login_device = '', password = '', username = '' }) => {
  // Decrypt Password
  var bytes = CryptoJS.AES.decrypt(password, 'password');
  var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  try {
    return axios.post('http://vega-api-sandbox.sinarmasmsiglife.co.id:8687/api-vega/login', {
      "last_login_device": last_login_device,
      "password": decryptedData,
      "username": username
    })
  } catch (error) {
    console.error(error)
  }
}

router.post('/', urlencodedParser, function (req, res, next) {
  const body = req.body
  loginService(body)
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      res.send(err);
    })
  console.log(req.body)
});

module.exports = router;
