/**
 * Contains all application endpoints
 */

import AnalyzeToneController from './controllers/AnalyzeToneController';

export default {
  '/translate': {
    get: {
      method: AnalyzeToneController.analyzeTone,
      public: true,
    },
  },
};
