const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Diagnosis = require('./models/Diagnosis');
const Domains = require('./models/Domains');
const Symptom = require('./models/Symptom');
const Diagnosis_Symptom = require('./models/Diagnosis_Symptom');
const Domain_Symptom = require('./models/Domain_Symptom');

const connection = new Sequelize(dbConfig);

Diagnosis.init(connection);
Domains.init(connection);
Symptom.init(connection);
Diagnosis_Symptom.init(connection);
Domain_Symptom.init(connection);

Diagnosis.associate(connection.models);
Domains.associate(connection.models);
Symptom.associate(connection.models);
Diagnosis_Symptom.associate(connection.models);
Domain_Symptom.associate(connection.models);

module.exports = connection;
