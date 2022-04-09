const { gql } = require('apollo-server-express');

const typeDefs = gql`
  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String
    lastName: String
  }

  type User {
    id: String!
    first_name: String
    last_name: String
    email: String
    balance: String
    created_at: String
    updated_at: String
  }

  type AuthPayload { 
    user: User!
    token: String!
  }

  type Query {
    users: [User]
    user: User
  }

  type Mutation {
    login(input: LoginInput): AuthPayload
    register(input: RegisterInput): AuthPayload
    updateBalance(id: Int!, amount: Float!): User
  }
`;

module.exports = typeDefs;
