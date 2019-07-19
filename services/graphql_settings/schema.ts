
import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    last1d: [TinlakeEvent]!
    last7d: [TinlakeEvent]!
    last30d: [TinlakeEvent]!
    last90d: [TinlakeEvent]!
  }

  type TinlakeEvent {
    timestamp: Int
    cvt_supply: Int
    debt: Int
    cdp_debt: Int
    collateral_value: Int
  }
`;


module.exports = typeDefs;