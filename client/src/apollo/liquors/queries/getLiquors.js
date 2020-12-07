import { gql } from '@apollo/client';

const GET_LIQUORS = gql`
  query {
    liquors {
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

export default GET_LIQUORS;
