import Tinlake from 'tinlake';
import { getTinlakeData } from './services/tinlake';
const EventAPI = require('./services/graphql_settings/datasources/event');

var Datastore = require('nedb')
  , db = new Datastore({ filename: '.tinlake_events.db', autoload: true });

let api = new EventAPI({ db });

let data = getTinlakeData();
data.then(result=>api.createEvent(result));

