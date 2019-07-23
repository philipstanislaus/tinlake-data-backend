"use strict";
exports.__esModule = true;
var resolvers = {
    Query: {
        last1d: function (_, __, _a) {
            var dataSources = _a.dataSources;
            return dataSources.EventAPI.findByPeriod('24h');
        },
        last7d: function (_, __, _a) {
            var dataSources = _a.dataSources;
            return dataSources.EventAPI.findByPeriod('7d');
        },
        last30d: function (_, __, _a) {
            var dataSources = _a.dataSources;
            return dataSources.EventAPI.findByPeriod('30d');
        },
        last90d: function (_, __, _a) {
            var dataSources = _a.dataSources;
            return dataSources.EventAPI.findByPeriod('90d');
        }
    }
};
exports["default"] = resolvers;
