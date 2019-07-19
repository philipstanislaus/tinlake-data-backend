const { DataSource } = require('apollo-datasource');


class EventAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async createEvent(data) {
    var doc = {
        timestamp: new Date(),
        Debt: data['Debt'],
        TotalValueofNFTs: data['TotalValueofNFTs'],
        totalSupply: data['totalSupply'],
        NumberOfLoans: data['NumberOfLoans']
    };

    this.store.insert(doc, function (err, newDoc) {});
  }
  async findByPeriod(period) {
    if (period == '24h') {
        var days = 1;
    }
    else if (period == '7d'){
        var days = 7;
    };

    var today_date = new Date();
    var end_date = today_date;
    var start_date = new Date();
    start_date.setDate(today_date.getDate()-days);

    return this.store.find({ timestamp: { $gte: start_date, $lte: end_date} }, function (err, docs) {
            if(err) reject(err);
            resolve(docs);
        });
   }

}

module.exports = EventAPI;