var express = require('express');
var router = express.Router();
const userManager = require('../services/user.manager');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await userManager.findAll();
  res.send({ users });
});

module.exports = router;
