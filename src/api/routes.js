const express = require('express');
const routes = express.Router();

const DiagnosisController = require('./controllers/DiagnosisController')

routes.get('/diagnosis',DiagnosisController.index);

module.exports = routes;
