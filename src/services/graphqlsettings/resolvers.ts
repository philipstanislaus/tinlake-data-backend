import { IResolvers } from 'graphql-tools';
import { eventAPI } from '../../config'



const resolvers: IResolvers = {
  Query: {
    last1d: () =>
      eventAPI.findByPeriod('24h'),
    last7d: () =>
      eventAPI.findByPeriod('7d'),
    last30d: () =>
      eventAPI.findByPeriod('30d'),
    last90d: () =>
      eventAPI.findByPeriod('90d'),
  },
};

export default resolvers;
