import { gql } from '@apollo/client';

const GET_COCKTAILS = gql`
  query {
    cocktails {
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

export default GET_COCKTAILS;
