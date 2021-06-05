const Diagnosis = require('../models/Diagnosis');
const Symptom = require('../models/Symptom');
const Diagnosis_Symptom = require('../models/Diagnosis_Symptom');

module.exports = {
  async index(_,res) {
    try {
      const diagnosis_symptom = await Diagnosis_Symptom.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'DiagnosisId',
            'SymptomId'
          ]
        }
      });

      return res.status(200).json(diagnosis_symptom);

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para listar as relações diagnósticos com sintomas.",
        "info-error": error.message,
      });
    }
  },

  async store(req, res){
    try {

      const {
        diagnostics_symptoms
      } = req.body;

      for (const {diagnosis_id,
        symptom_id,} of diagnostics_symptoms) 
        {
          const diagnosis = await Diagnosis.findByPk(diagnosis_id);

          const symptom = await Symptom.findByPk(symptom_id);
                
          await diagnosis.addSymptom(symptom);
        }
            
      return res.status(201).json({
        "message": "Relação Diagnóstico e Sintoma criada com sucesso.",
      });
      
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        "message-error": "Houve algum problema para salvar esta relação diagnóstico e sintoma.",
        "info-error": error.message,
      });
    }
  }
}
