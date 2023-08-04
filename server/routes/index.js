var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
});

router.post('/token', async function(req, res, next) {
  console.log(req.body._id)
  const token = await auth.reSignJwt(req.body._id,req.headers.authorization.split(' ')[1])
  console.log(token)
  res.json(token)
});

module.exports = router;
