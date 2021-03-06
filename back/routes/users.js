var express = require('express');
var router = express.Router();
const userManager = require('../services/user.manager');
var passport = require('passport');

/**
 * GET List all users
 */
router.get(
  '/',
  passport.authenticate('header', {
    optional: false,
  }),
  async function (req, res, next) {
    const users = await userManager.findAll();
    res.send({ users });
  },
);

/**
 * GET Display one user
 */
router.get(
  '/:id',
  passport.authenticate('header', {
    optional: false,
  }),
  async function (req, res, next) {
    const user = await userManager.findUser(req.params.id);
    res.send({ user });
  },
);

/**
 * PUT update firstname of a user
 */
router.put(
  '/:id',
  passport.authenticate('header', {
    optional: false,
  }),
  async function (req, res, next) {
    if (!req.body.firstname || req.body.firstname === '') {
      res.status(400);
      res.send();

      return;
    }
    const user = await userManager.updateUser(
      req.params.id,
      req.body.firstname,
    );
    res.send({ user });
  },
);

module.exports = router;
