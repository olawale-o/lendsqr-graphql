const { env } = require('./constants');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { buildContext } = require('graphql-passport');
const { GraphQLLocalStrategy } = require('graphql-passport');
const passport = require('passport');
const app = express();
const { PORT } = env;
const UserController = require('./controllers/users_controller');
const UserService = require('./services/usersService');
const resolvers = require('./resolvers');
const typeDefs =  require('./typedefs');

passport.use(
  new GraphQLLocalStrategy({ passReqToCallback: true }, async (req, email, password, done) => {
    try {
      const { user } = await UserController.authenticateUser(email, password);
      console.log(user);
      done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      UserService,
    }),
    context: ({ req, res }) => buildContext({ req, res })
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  app.listen({ port: parseInt(PORT, 10) }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

startApolloServer(typeDefs, resolvers);
