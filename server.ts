import express from 'express'
import { ApolloServer } from 'apollo-server-express'
const schema = require('./services/graphql_settings/schema');
const resolvers = require('./services/graphql_settings/resolvers');
const EventAPI = require('./services/graphql_settings/datasources/event');


import fs from 'fs'
import https from 'https'
import http from 'http'

var Datastore = require('nedb')
  , db = new Datastore({ filename: '.tinlake_events.db', autoload: true });



const configurations = {
  // Note: You may need sudo to run on port 443
  production: { ssl: true, port: 443, hostname: 'example.com' },
  development: { ssl: false, port: 4000, hostname: 'localhost' }
}

const environment = process.env.NODE_ENV || 'production'
const config = configurations[environment]

let eventAPI = new EventAPI({ db });

const dataSources = () => ({
  eventAPI: new EventAPI({ db }),
});

const apollo = new ApolloServer({ schema, resolvers, dataSources })

const app = express()
apollo.applyMiddleware({ app })

// Create the HTTPS or HTTP server, per configuration
var server
if (config.ssl) {
  // Assumes certificates are in .ssl folder from package root. Make sure the files
  // are secured.
  server = https.createServer(
    {
      key: fs.readFileSync(`./ssl/${environment}/server.key`),
      cert: fs.readFileSync(`./ssl/${environment}/server.crt`)
    },
    app
  )
} else {
  server = http.createServer(app)
}

// Add subscription support
apollo.installSubscriptionHandlers(server)

server.listen({ port: config.port }, () =>
  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${apollo.graphqlPath}`
  )
)