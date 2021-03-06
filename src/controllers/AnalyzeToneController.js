import AnalyzeToneService from '../services/AnalyzeToneService';
import TranslateTextService from '../services/TranslateTextService';
import ListHistoryService from '../services/ListHistoryService';
import InsertHistoryService from '../services/InsertHistoryService';

export default {
  analyzeTone,
}

async function analyzeTone(req, res) {
  try {
    var availableLang = await TranslateTextService.getIdentifiableLanguages();

    var inputString = req.query['inputString'];
    var destinationLang = req.query['selectedLang'];
    console.log(destinationLang);

    if (inputString != null) {
      var translatedString = await TranslateTextService.translateText(inputString, destinationLang);
      var analyzedToneObject = await AnalyzeToneService.analyzeTone(inputString);
      var analyzedToneString = "";
      for (let i = 0; i < 5; i++) {
        analyzedToneString += `${analyzedToneObject.document_tone.tone_categories[2].tones[i].tone_name} : ${analyzedToneObject.document_tone.tone_categories[2].tones[i].score} \n`
      }

      var recordToBeInserted = {
        inputString: inputString,
        destinationLang: destinationLang,
        translatedString: translatedString
      }
      console.log("recordInserted", recordToBeInserted);
      var recordInserted = await InsertHistoryService.insertHistory(recordToBeInserted);
    }
    res.render('index', { result: analyzedToneString, availableLangArray: availableLang.languages, translatedText: translatedString });
  } catch(err) {
    console.log("Error", err.error_code, err.error_message);
    let error_msg = `Error Code: ${err.error_code} <br> Error Message: ${err.error_message}`;
    res.send(error_msg);
  }
}