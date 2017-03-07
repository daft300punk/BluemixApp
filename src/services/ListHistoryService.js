import decorate from 'decorate-it';
import Cloudant from 'cloudant';
import Joi from 'joi';

const ListHistoryService = {
  listHistory,
  findTotalRecordsInDb
};;

decorate(ListHistoryService, 'ListHistoryService');

export default ListHistoryService;

var cloudant = Cloudant({
  account: process.env.CLOUDANT_ACCOUNT,
  password: process.env.CLOUDANT_PASSWORD,
});

async function listHistory(num = 5) {
  var db = cloudant.db.use(process.env.DB_NAME);
  var recordsInDb = await findTotalRecordsInDb();
  console.log("records in db", recordsInDb);
  var result = [];
  for (let i = recordsInDb; i > 0 && recordsInDb - i < 5; i--) {
    result = result.concat(await getRecord(i));
  }
  return result;
}

function findTotalRecordsInDb() {
  return new Promise(function (resolve, reject) {
    cloudant.db.get(process.env.DB_NAME, function (err, result) {
      if (err) reject(err);
      else resolve(result.doc_count);
    });
  });
}

function getRecord(id) {
  var db = cloudant.db.use(process.env.DB_NAME);
  return new Promise(function (resolve, reject) {
    db.get(`${id}`,
      function (err, data) {
        if (err) reject(err);
        else resolve(data);
      });
  });
}

listHistory.params = ['num'];
listHistory.schema = {
  num: Joi.number(),
}

findTotalRecordsInDb.schema = {
  
}