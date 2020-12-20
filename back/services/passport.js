const userManager = require('../services/user.manager');

var passport = require('passport'),
  HeaderStrategy = require('passport-http-header-strategy').Strategy;

passport.use(
  new HeaderStrategy(
    { header: 'authorization', passReqToCallback: true },
    async function (req, token, done) {
      let existingUser = await userManager.findUserByToken(token);

      if (!existingUser) {
        return done(null, false, { message: 'Incorrect token.' });
      }

      return done(null, existingUser);
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;
