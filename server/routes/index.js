var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/token', async function(req, res, next) {
  const token = await auth.reSignJwt(req.body._id,req.body.accessToken)
  res.json(token)
});

module.exports = router;
