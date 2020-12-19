var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');

const userManager = require('../services/user.manager');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', async function (req, res, next) {
  console.log(req);
  const user = await userManager.addUser(req.body);
  console.log('user', user);
  res.send(user);
});

router.post('/upload', function (req, res, next) {
  var appDir = path.dirname(require.main.filename);

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var fs = require('fs');
    const newUrl = __dirname  + '/../../front/public/uploads/' + files.file.name;
    fs.rename(files.file.path, newUrl, function (err) {
      console.error(err);
    });
    const user = userManager.setPicture(req.query.user, 'uploads/' + files.file.name);
    res.write('File uploaded');
    res.end();
  });
});

module.exports = router;
