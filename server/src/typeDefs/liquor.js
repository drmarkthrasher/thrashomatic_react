import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    liquors: [LiquorBarItem!]!
    getLiquor(id: ID!): LiquorBarItem
  }
  extend type Mutation {
    addLiquor(
      index: Int!
      title: String!
      isChecked: Boolean!
      amount: Float!
      isAvailable: Boolean!
      type: String!
    ): LiquorBarItem
    deleteLiquor(id: ID!): LiquorBarItem
    editLiquor(liquors: [LiquorBarItemInput!]): [LiquorBarItem]
  }

  input LiquorBarItemInput {
    id: ID!
    index: Int!
    title: String!
    isChecked: Boolean!
    amount: Float!
    isAvailable: Boolean!
    type: String!
  }

  type LiquorBarItem {
    id: ID!
    index: Int!
    title: String!
    isChecked: Boolean!
    amount: Float!
    isAvailable: Boolean!
    type: String!
  }
`;
