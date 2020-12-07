import { gql } from '@apollo/client';

const EDIT_COCKTAIL = gql`
  mutation editCocktail(
    $id: ID!
    $name: String!
    $otherIngredients: String
    $liquors: [Liquor!]
  ) {
    editCocktail(
      id: $id
      name: $name
      otherIngredients: $otherIngredients
      liquors: $liquors
    ) {
      id
      name
      otherIngredients
      liquors {
        index
        title
        isChecked
        amount
      }
    }
  }
`;

export default EDIT_COCKTAIL;
