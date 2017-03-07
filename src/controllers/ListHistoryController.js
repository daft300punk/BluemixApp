import ListHistoryService from '../services/ListHistoryService';

export default {
  listHistory,
}

async function listHistory(req, res) {
  const historyObject = await ListHistoryService.listHistory();
  var historyData = historyObject.map((history) => { return history.rec; });
  res.render('history', {historyData});
}