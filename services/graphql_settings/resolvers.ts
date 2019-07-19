module.exports = {
  Query: {
    last1d: (_, __, { dataSources }) =>
      dataSources.EventAPI.findByPeriod('24h'),
    last7d: (_, __, { dataSources }) =>
      dataSources.EventAPI.findByPeriod('7d'),
    last30d: (_, __, { dataSources }) =>
      dataSources.EventAPI.findByPeriod('30d'),
    last90d: (_, __, { dataSources }) =>
      dataSources.EventAPI.findByPeriod('90d'),

  }
};