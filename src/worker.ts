import { getTinlakeData } from 'src/services/tinlake';
import Datastore from 'nedb';
import EventAPI from 'services/graphqlsettings/datasources/event';

const db = new Datastore({ filename: '.tinlake_events.db', autoload: true });

const api = new EventAPI({ store: db });

//const data = getTinlakeData();
//data.then(result => api.createEvent(result));
