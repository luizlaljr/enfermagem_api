const express = require('express');
const routes = express.Router();

const DiagnosisController = require('./controllers/DiagnosisController')
const SymptomController = require('./controllers/SymptomController')
const Diagnosis_SymptomController = require('./controllers/Diagnosis_SymptomController');
const Fetch_SymptomsController = require('./controllers/Fetch_SymptomsController');

routes.get('/diagnosis', DiagnosisController.index);
routes.post('/diagnosis', DiagnosisController.store);
routes.get('/diagnosis/:diagnosis_id', DiagnosisController.show);
routes.put('/diagnosis/:diagnosis_id', DiagnosisController.update);
routes.delete('/diagnosis/:diagnosis_id', DiagnosisController.destroy);

routes.get('/symptom', SymptomController.index);
routes.post('/symptom', SymptomController.store);
routes.get('/symptom/:symptom_id', SymptomController.show);
routes.put('/symptom/:symptom_id', SymptomController.update);
routes.delete('/symptom/:symptom_id', SymptomController.destroy);

routes.get('/diagnosis_symptom', Diagnosis_SymptomController.index);
routes.post('/diagnosis_symptom', Diagnosis_SymptomController.store);

routes.get('/:symptom', Fetch_SymptomsController.index);

module.exports = routes;
