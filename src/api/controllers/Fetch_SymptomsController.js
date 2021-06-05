const Symptom = require('../models/Symptom');

module.exports = {
  async index(req, res) {
    try {
      const {
        id
      } = req.query;

      const symptoms = await Symptom.sequelize.query(`select diagnostics.id, diagnostics.name, count(diagnostics.name) as amount from symptoms inner join diagnosis_symptom on symptoms.id = diagnosis_symptom.symptom_id inner join diagnostics on diagnostics.id = diagnosis_symptom.diagnosis_id where symptoms.id IN ( ${id} ) group by diagnostics.id, diagnostics.name order by amount DESC`, {
        model: Symptom,
        mapToModel: true,
        nest: true,
    });

      return res.status(200).json(symptoms)

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para encontrar este diagnóstico.",
        "info-error": error.message,
      });
    }
  }
}
