/**
 * Contains all application endpoints
 */

import AnalyzeToneController from './controllers/AnalyzeToneController';
import ListHistoryController from './controllers/ListHistoryController';

export default {
  '/translate': {
    get: {
      method: AnalyzeToneController.analyzeTone,
      public: true,
    },
  },
  '/history': {
    get: {
      method: ListHistoryController.listHistory,
      public: true,
    },
  },
};
