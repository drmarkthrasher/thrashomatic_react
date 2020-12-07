import { gql } from '@apollo/client';

const GET_COCKTAIL = gql`
  query getCocktail($id: ID!) {
    getCocktail(id: $id) {
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

export default GET_COCKTAIL;
