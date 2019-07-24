import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './services/graphqlsettings/schema';
import resolvers  from './services/graphqlsettings/resolvers';
import EventAPI  from './services/graphqlsettings/datasources/event';
import fs from 'fs';
import https from 'https';
import http from 'http';
import Datastore from 'nedb';

const db = new Datastore({ filename: '.tinlake_events.db', autoload: true });

const configurations = {
  // Note: You may need sudo to run on port 443
  production: { ssl: true, port: 443, hostname: 'example.com' },
  development: { ssl: false, port: 4000, hostname: 'localhost' },
};

const environment = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const config = configurations[environment];

const dataSources = () => ({
  eventAPI: new EventAPI({ store: db }),
});

const apollo = new ApolloServer({ typeDefs, resolvers, dataSources });

const app = express();
apollo.applyMiddleware({ app });

// Create the HTTPS or HTTP server, per configuration
let server;
if (config.ssl) {
  // Assumes certificates are in .ssl folder from package root. Make sure the files
  // are secured.
  server = https.createServer(
    {
      key: fs.readFileSync(`./ssl/${environment}/server.key`),
      cert: fs.readFileSync(`./ssl/${environment}/server.crt`),
    },
    app,
  );
} else {
  server = http.createServer(app);
}

// Add subscription support
apollo.installSubscriptionHandlers(server);

server.listen({ port: config.port }, () =>
  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${apollo.graphqlPath}`,
  ),
);
