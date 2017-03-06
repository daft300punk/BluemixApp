import decorate from 'decorate-it';
import ToneAnalyzer from 'watson-developer-cloud/tone-analyzer/v3';
import Joi from 'joi';
import dotenv from 'dotenv';

dotenv.config();

const AnalyzeToneService = {
  analyzeTone,
};

decorate(AnalyzeToneService, 'AnalyzeToneService');

export default AnalyzeToneService;

var tone_analyzer = new ToneAnalyzer({
  username: process.env.TONEANALYZER_USERNAME,
  password: process.env.TONEaNALYZER_PASSWORD,
  version: 'v3',
  version_date: '2016-05-19',
});

function analyzeTone(text) {
  return new Promise(function (resolve, reject) {
    tone_analyzer.tone(
      { text: text },
      function (err, tone) {
        if (err) return reject(err);
        else return resolve(tone);
      });
  });
}

analyzeTone.params = ['text'];
analyzeTone.schema = {
  text: Joi.string(),
}
