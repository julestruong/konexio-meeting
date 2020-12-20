var express = require('express');
var router = express.Router();
var formidable = require('formidable');
const userManager = require('../services/user.manager');
var jwt = require('jwt-simple');

var secret = "12345";

/**
 * POST register a user
 */
router.post('/register', async function (req, res, next) {
  const email = req.body.email;
  const existingUser = await userManager.findUserByEmail(email);
  if (existingUser) {
    res.status(400);
    res.send({message: 'email already existing'})
    return;
  }
  const user = await userManager.addUser(req.body);
  res.send(user);
});

/**
 * POST upload a picture and set url to the user 
 */
router.post('/upload', function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var fs = require('fs');
    const newUrl = __dirname + '/../../front/public/uploads/' + files.file.name;
    fs.rename(files.file.path, newUrl, function (err) {
      console.error(err);
    });
    const user = userManager.setPicture(
      req.query.user,
      'uploads/' + files.file.name,
    );
    res.write('File uploaded');
    res.end();
  });
});

/**
 * POST login route to check username/password and create accessToken
 */
router.post('/login', async function (req, res) {

  const username = req.body.username;
  const password = req.body.password;
  
  let existingUser = await userManager.findUserByEmail(username);

  if (!existingUser) {
    res.status(401);
    res.send({ message: 'Incorrect username.' });
    return;
  }
  
  if (existingUser.password !== password) {
    res.status(401);
    res.send({ message: 'Incorrect password.' });
    return;
  }

  var token = jwt.encode({ username, password }, secret);
  await userManager.updateUserToken(username, token);
  existingUser = await userManager.findUserByEmail(username);


  res.send({ user: existingUser });
});

module.exports = router;
