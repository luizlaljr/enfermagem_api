const express = require('express');
const routes = express.Router();

const DiagnosisController = require('./controllers/DiagnosisController')

routes.get('/diagnosis', DiagnosisController.index);
routes.post('/diagnosis', DiagnosisController.store);
routes.get('/diagnosis/:diagnosis_id', DiagnosisController.show);
routes.put('/diagnosis/:diagnosis_id', DiagnosisController.update);
routes.delete('/diagnosis/:diagnosis_id', DiagnosisController.destroy);

module.exports = routes;
