const { GraphQLLocalStrategy } = require('graphql-passport');
const passport = require('passport');
const UserController = require('../controllers/users_controller');

passport.use(
  new GraphQLLocalStrategy({ passReqToCallback: true }, async (req, email, password, done) => {
    try {
      const { user } = await UserController.authenticateUser(email, password);
      done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);
