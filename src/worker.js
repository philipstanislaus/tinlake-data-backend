"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var nedb_1 = __importDefault(require("nedb"));
var event_1 = __importDefault(require("./services/graphqlsettings/datasources/event"));
var db = new nedb_1["default"]({ filename: '.tinlake_events.db', autoload: true });
var api = new event_1["default"]({ store: db });
//const data = getTinlakeData();
//data.then(result => api.createEvent(result));
