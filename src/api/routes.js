const express = require('express');
const routes = express.Router();

const DiagnosisController = require('./controllers/DiagnosisController')
const SymptomController = require('./controllers/SymptomController')
const Diagnosis_SymptomController = require('./controllers/Diagnosis_SymptomController');
const Fech_DiagnosisController = require('./controllers/Fetch_DiagnosisController');

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

routes.get('/:symptom', Fech_DiagnosisController.index);

module.exports = routes;
