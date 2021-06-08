const Symptom = require('../models/Symptom');

module.exports = {
  async index(req, res) {
    try {
      const {
        id
      } = req.query;

      const symptoms = await Symptom.sequelize.query(`select diagnostics.id, diagnostics.name, count(diagnostics.name) as amount 
      from symptoms 
      inner join diagnosis_symptom on symptoms.id = diagnosis_symptom.symptom_id 
      inner join diagnostics on diagnostics.id = diagnosis_symptom.diagnosis_id 
      where symptoms.id IN ( ${id} ) 
      group by diagnostics.id, diagnostics.name 
      order by amount DESC`, {
        model: Symptom,
        mapToModel: true,
        nest: true,
      });

      const relatedSymptoms = await Symptom.sequelize.query(`select diagnostics.id, symptoms.name from symptoms inner join diagnosis_symptom on symptoms.id = diagnosis_symptom.symptom_id inner join diagnostics on diagnostics.id = diagnosis_symptom.diagnosis_id where symptoms.id IN ( ${id} ) group by diagnostics.id, symptoms.name`, {
        model: Symptom,
        mapToModel: true,
        nest: true,
      });

      let newSymptoms = []
      symptoms.map((value) => {
        const newRelated = relatedSymptoms.filter((item)=>(item.id === value.id))
        newSymptoms.push({
          id: value.id,
          name: value.name,
          amount: value.amount,
          related: newRelated
        })
      })

      return res.status(200).json(newSymptoms)

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para encontrar este diagnóstico.",
        "info-error": error.message,
      });
    }
  }
}
