import EventAPI  from './services/graphqlsettings/datasources/event';
import Datastore from 'nedb';

const datastore = new Datastore({ filename: '.tinlake_events.db', autoload: true });

export const eventAPI = new EventAPI(datastore);

export const config = {
  rpcUrl: 'https://kovan.infura.io/v3/092108ec6aea46ab97b2175b45130455',
  ethPrKey: '0x30934837cdc94b93a7142122338784b6c73183c8aa1d279b47e84f85c5d7367f',
  EthFromAddress: '0x54b7ffd4ae11b0896b4fc2cf59e5570dbdf18abd',
  runEveryMinute: 1,
};

export default config;
