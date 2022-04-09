const { env: { JWT_SECRET } } = require('../constants');
const jwt = require('jsonwebtoken');
const UserController = require('../controllers/users_controller');
const resolvers = {
  Query: {
    users: async (parent, args, { dataSources }, context) => dataSources.UserService.allUsers(),
  },

  Mutation: {
    login: async (parent, { input }, context) => {
      const obj = await UserController.authenticateUser(input);
      const token = jwt.sign({ user: obj.user }, JWT_SECRET, { expiresIn: '1y' })
      return { user: obj.user, token };
    },
    register:  async (parent, { input }, context) => {
      const obj = await UserController.createUser(input);
      const token = jwt.sign({ user: obj.user }, JWT_SECRET, { expiresIn: '1y' })
      return { user: obj.user, token };
    },
  }
};

module.exports = resolvers;
