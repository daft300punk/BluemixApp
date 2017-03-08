import ListHistoryService from '../services/ListHistoryService';

export default {
  listHistory,
}

async function listHistory(req, res) {
  try {
    let getHistNum = req.query['getHistNum'];
    console.log(getHistNum);
    if(getHistNum != null) {
      const historyObject = await ListHistoryService.listHistory(getHistNum);
      var historyData = historyObject.map((history) => { return history.rec; });
    }
    res.render('history', {historyData});
  } catch(err) {
    let error_msg = `Error Code: ${err.error_code} <br> Error Message: ${err.error_message}`;
    res.send(error_msg);
  }
}