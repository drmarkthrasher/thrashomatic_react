import { gql } from '@apollo/client';

const ADD_LIQUOR = gql`
  mutation addLiquor(
    $index: Int!
    $title: String!
    $isChecked: Boolean!
    $amount: Float!
    $isAvailable: Boolean!
    $type: String!
  ) {
    addLiquor(
      index: $index
      title: $title
      isChecked: $isChecked
      amount: $amount
      isAvailable: $isAvailable
      type: $type
    ) {
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

export default ADD_LIQUOR;
