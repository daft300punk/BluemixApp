import ListHistoryService from '../services/ListHistoryService';

export default {
  listHistory,
}

async function listHistory(req, res) {
  res.send(await ListHistoryService.listHistory());
}