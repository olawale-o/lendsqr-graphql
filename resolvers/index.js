const { env: { JWT_SECRET } } = require('../constants');
const { ForbiddenError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const UserController = require('../controllers/users_controller');
const resolvers = {
  Query: {
    users: async (parent, args, { dataSources }, context) => dataSources.UserService.allUsers(),
    user: async (parent, { id }, { dataSources }, context) => dataSources.UserService.getUser(id),
  },

  Mutation: {
    login: async (parent, { input }, { req, res }) => {
      const obj = await UserController.graphAuthenticateUser(input);
      const token = jwt.sign({ user: obj.user }, JWT_SECRET, { expiresIn: '1y' })
      return { user: obj.user, token };
    },
    register:  async (parent, { input }, context) => {
      const obj = await UserController.graphCreateUser(input);
      const token = jwt.sign({ user: obj.user }, JWT_SECRET, { expiresIn: '1y' })
      return { user: obj.user, token };
    },
    updateBalance: async (parent, { id, amount }, context, info) => {
      const obj = await UserController.deposit(id, amount);
      if (!context.token) {
        throw new ForbiddenError('You must be logged in to perform this action');
      }
      return obj.user;
    },
  }
};

module.exports = resolvers;
