import { gql } from '@apollo/client';

const REGISTER = gql`
  mutation register(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      id
      email
    }
  }
`;

export default REGISTER;
