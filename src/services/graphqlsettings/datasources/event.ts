import Datastore from 'nedb';

class EventAPI {
  datastore: Datastore;

  constructor(datastore: Datastore) {
        this.datastore = datastore;
  }
  async createEvent(data:
    { Debt: string, TotalValueofNFTs: string, totalSupply: string, NumberOfLoans: string; }) {
    return new Promise((resolve, reject) => {
      const doc = {
        timestamp: new Date(),
        Debt: data['Debt'],
        TotalValueofNFTs: data['TotalValueofNFTs'],
        totalSupply: data['totalSupply'],
        NumberOfLoans: data['NumberOfLoans'],
      };

      this.datastore.insert(doc, (err, newDoc) => {
        if (err) { reject(err); } else { resolve(newDoc); }
      });
    });
  }
  async findByPeriod(period: '24h' | '7d') {
    return new Promise((resolve, reject) => {
      let days: number = 30;
      if (period === '24h') {
        days = 1;
      } else if (period === '7d') {
        days = 7;
      }

      const today_date = new Date();
      const end_date = today_date;
      const start_date = new Date();
      start_date.setDate(today_date.getDate() - days);

      return this.datastore.find(
        { timestamp: { $gte: start_date, $lte: end_date } },
        (err: Error, docs: any) => {
          if (err) { reject(err); } else { resolve(docs); }
        });
    });
  }

}

export default EventAPI;
