import gql from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    last1d: [TinlakeEvent]!
    last7d: [TinlakeEvent]!
    last30d: [TinlakeEvent]!
    last90d: [TinlakeEvent]!
  }

  type TinlakeEvent {
    timestamp: String
    total_debt: Int
    total_balance: Int
    total_value_of_nfts: Int
    total_supply: Int
    number_of_loans: Int
  }
`;

export default typeDefs;
