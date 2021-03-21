var express = require('express');
var router = express.Router();
var axios = require('axios')

const collections = () => {
    try {
        return axios.get('https://developers.zomato.com/api/v2.1/collections?city_id=7', {headers: { 'user-key': 'b35aa1fe430b85914c5cf03369d365f3' }})
      } catch (error) {
        console.error(error)
      }    
}

router.get('/', function(req, res, next) {
    collections()
    .then(result => {
      console.log(result)
      res.send(result.data);
    })
    .catch(err =>{
      console.log(err)
      res.send(err);
    })
});

module.exports = router;
