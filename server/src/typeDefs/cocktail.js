import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    cocktails: [Cocktail!]!
    getCocktail(id: ID!): Cocktail
  }
  extend type Mutation {
    addCocktail(
      name: String!
      otherIngredients: String
      liquors: [Liquor!]
    ): Cocktail
    deleteCocktail(id: ID!): Cocktail
    editCocktail(
      id: ID!
      name: String!
      otherIngredients: String
      liquors: [Liquor!]
    ): Cocktail
  }
  input Liquor {
    index: Int!
    title: String!
    isChecked: Boolean!
    amount: Float!
  }
  type Cocktail {
    id: ID!
    name: String!
    otherIngredients: String
    liquors: [Liquors]
    owner: User!
  }
  type Liquors {
    index: Int!
    title: String!
    isChecked: Boolean!
    amount: Float!
  }
`;
