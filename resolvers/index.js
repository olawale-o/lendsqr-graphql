const resolvers = {
  Query: {
    users: async (_, __, { dataSources }) => dataSources.UserService.allUsers(),
  },

  Mutation: {
    login: async (parent, { input }, context) => {
      const { email, password } = input;
      const obj = await context.authenticate("graphql-local", {
        email,
        password
      });
      return { obj };
    },
  }
};

module.exports = resolvers;
