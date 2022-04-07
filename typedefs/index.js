const { gql } = require('apollo-server-express');

const typeDefs = gql`
  input LoginInput {
    email: String!
    password: String!
  }

  type User {
    id: String!
    first_name: String
    last_name: String
    email: String!
    balance: String!
    created_at: String
    updated_at: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    login(input: LoginInput): User
  }
`;

module.exports = typeDefs;
