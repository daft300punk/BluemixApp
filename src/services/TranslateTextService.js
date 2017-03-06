import decorate from 'decorate-it';
import LanguageTranslatorV2 from 'watson-developer-cloud/language-translator/v2';
import Joi from 'joi';

const TranslatetextService = {
  translateText,
  getIdentifiableLanguages,
};

decorate(TranslatetextService, 'TranslatetextService');

export default TranslatetextService;

var language_translator = new LanguageTranslatorV2({
  username: process.env.LANGUAGE_TRANSLATOR_USERNAME,
  password: process.env.LANGUAGE_TRANSLATOR_PASSWORD,
  url: 'https://gateway.watsonplatform.net/language-translator/api/'
});

function translateText(text, targetLang) {
  return new Promise(function (resolve, reject) {
    language_translator.translate({
      text: text, source: 'en', target: targetLang
    }, function (err, translation) {
      if (err) {
        reject(err);
      }
      else {
        resolve(translation.translations[0].translation);
      }
    });
  });
}

function getIdentifiableLanguages() {
  return new Promise(function(resolve, reject) {
    language_translator.getIdentifiableLanguages(null,
    function(err, languages) {
      if(err) reject(err);
      else resolve(languages);
    });
  });
}

translateText.params = ['text', 'targetLang'];
translateText.schema = {
  text: Joi.string(),
  targetLang: Joi.string(),
}

getIdentifiableLanguages.schema = {

}