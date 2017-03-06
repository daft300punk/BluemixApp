import decorate from 'decorate-it';
import Cloudant from 'cloudant';
import Joi from 'joi';

import ListHistoryService from './ListHistoryService';

const InsertHistoryService = {
  insertHistory,
};;

decorate(InsertHistoryService, 'InsertHistoryService');

export default InsertHistoryService;

var cloudant = Cloudant({
  account: process.env.CLOUDANT_ACCOUNT,
  password: process.env.CLOUDANT_PASSWORD,
});


async function insertHistory(record) {
  console.log(record);
  var db = cloudant.db.use(process.env.DB_NAME);
  console.log(record);
  var insertPos = await ListHistoryService.findTotalRecordsInDb() + 1;
  console.log("insertPos", insertPos);

  return new Promise(function (resolve, reject) {
    db.insert({ _id: `${insertPos}`, rec: record },
      function (err, data) {
        if (err) reject(err);
        else resolve(data);
      });
  });
}

insertHistory.params = ['record'];
insertHistory.schema = {
  record: Joi.object(),
}