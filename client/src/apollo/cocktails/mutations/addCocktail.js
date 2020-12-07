import { gql } from '@apollo/client';

const ADD_COCKTAIL = gql`
  mutation addCocktail(
    $name: String!
    $otherIngredients: String
    $liquors: [Liquor!]
  ) {
    addCocktail(
      name: $name
      otherIngredients: $otherIngredients
      liquors: $liquors
    ) {
      id
      name
      liquors {
        index
        title
        isChecked
        amount
      }
    }
  }
`;

export default ADD_COCKTAIL;
