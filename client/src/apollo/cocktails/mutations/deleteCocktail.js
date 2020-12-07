import { gql } from '@apollo/client';

const DELETE_COCKTAIL = gql`
  mutation deleteCocktail($id: ID!) {
    deleteCocktail(id: $id) {
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

export default DELETE_COCKTAIL;
