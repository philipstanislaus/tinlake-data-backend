import { getTinlakeData } from './services/tinlake';
import { eventAPI } from './config'

const data = getTinlakeData();
data.then(result => eventAPI.createEvent(result));
