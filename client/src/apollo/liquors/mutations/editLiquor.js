import { gql } from '@apollo/client';

const EDIT_LIQUOR = gql`
  mutation editLiquor($liquors: [LiquorBarItemInput!]) {
    editLiquor(liquors: $liquors) {
      id
      index
      title
      isChecked
      amount
      isAvailable
      type
    }
  }
`;

export default EDIT_LIQUOR;
