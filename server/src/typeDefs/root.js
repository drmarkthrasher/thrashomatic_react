import { gql } from "apollo-server";

export default gql`
  type Query {
    empty: String
  }
  type Mutation {
    empty: String
  }
  type Subscription {
    empty: String
  }
`;
