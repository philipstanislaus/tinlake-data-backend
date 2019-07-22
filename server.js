"use strict";
exports.__esModule = true;
var express_1 = require("express");
var apollo_server_express_1 = require("apollo-server-express");
var schema = require('./services/graphql_settings/schema');
var resolvers = require('./services/graphql_settings/resolvers');
var EventAPI = require('./services/graphql_settings/datasources/event');
var fs_1 = require("fs");
var https_1 = require("https");
var http_1 = require("http");
var Datastore = require('nedb'), db = new Datastore({ filename: '.tinlake_events.db', autoload: true });
var configurations = {
    // Note: You may need sudo to run on port 443
    production: { ssl: true, port: 443, hostname: 'example.com' },
    development: { ssl: false, port: 4000, hostname: 'localhost' }
};
var environment = process.env.NODE_ENV === 'development' ? 'development' : 'production';
var config = configurations[environment];
var dataSources = function () { return ({
    eventAPI: new EventAPI({ db: db })
}); };
var apollo = new apollo_server_express_1.ApolloServer({ schema: schema, resolvers: resolvers, dataSources: dataSources });
var app = express_1["default"]();
apollo.applyMiddleware({ app: app });
// Create the HTTPS or HTTP server, per configuration
var server;
if (config.ssl) {
    // Assumes certificates are in .ssl folder from package root. Make sure the files
    // are secured.
    server = https_1["default"].createServer({
        key: fs_1["default"].readFileSync("./ssl/" + environment + "/server.key"),
        cert: fs_1["default"].readFileSync("./ssl/" + environment + "/server.crt")
    }, app);
}
else {
    server = http_1["default"].createServer(app);
}
// Add subscription support
apollo.installSubscriptionHandlers(server);
server.listen({ port: config.port }, function () {
    return console.log('🚀 Server ready at', "http" + (config.ssl ? 's' : '') + "://" + config.hostname + ":" + config.port + apollo.graphqlPath);
});
