import { getTinlakeData } from 'services/tinlake';
import Datastore from 'nedb';
import EventAPI from 'services/graphqlsettings/datasources/event';

const db = new Datastore({ filename: '.tinlake_events.db', autoload: true });

const dataSources = () => ({
  eventAPI: new EventAPI({ store: db }),
});

var api = dataSources.eventAPI();
//const api = new EventAPI({ store: db });



const data = getTinlakeData();
data.then(result => api.createEvent(result));
