import AnalyzeToneService from '../services/AnalyzeToneService';

export default {
  analyzeTone,
}

async function analyzeTone(req, res) {
  var inputString = req.query['inputString'];
  console.log(inputString);
  if(inputString != null) {
    var analyzedToneObject = await AnalyzeToneService.analyzeTone(inputString);
    var analyzedToneString = "";
    for (let i = 0; i < 5; i++) {
      analyzedToneString += `${analyzedToneObject.document_tone.tone_categories[2].tones[i].tone_name} : ${analyzedToneObject.document_tone.tone_categories[2].tones[i].score} \n`
    }
  }
  res.render('index', {analyzedToneString: analyzedToneString,});
}