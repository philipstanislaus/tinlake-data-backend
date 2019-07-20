"use strict";
exports.__esModule = true;
var tinlake_1 = require("./services/tinlake");
var EventAPI = require('./services/graphql_settings/datasources/event');
var Datastore = require('nedb'), db = new Datastore({ filename: '.tinlake_events.db', autoload: true });
var api = new EventAPI({ db: db });
var data = tinlake_1.getTinlakeData();
data.then(function (result) { return api.createEvent(result); });
