import { gql } from "apollo-server";

export default gql`
  extend type Query {
    user(id: ID!): User
    users: [User!]!
  }
  extend type Mutation {
    register(
      firstname: String!
      lastname: String!
      email: String!
      password: String!
    ): User
    login(email: String!, password: String!): AuthData!
  }
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    createdAt: String!
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
`;
