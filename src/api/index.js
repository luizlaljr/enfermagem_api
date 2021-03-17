const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Diagnosis = require('./models/Diagnosis');
const Symptom = require('./models/Symptom');
const Diagnosis_Symptom = require('./models/Diagnosis_Symptom');

const connection = new Sequelize(dbConfig);

Diagnosis.init(connection);
Symptom.init(connection);
Diagnosis_Symptom.init(connection);

Diagnosis.associate(connection.models);
Symptom.associate(connection.models);

module.exports = connection;
