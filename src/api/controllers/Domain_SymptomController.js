const Domain = require('../models/Domains');
const Symptom = require('../models/Symptom');
const Domain_Symptom = require('../models/Domain_Symptom');

module.exports = {
  async index(_,res) {
    try {
      const domain_symptom = await Domain_Symptom.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'DomainId',
            'SymptomId'
          ]
        }
      });

      return res.status(200).json(domain_symptom);

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para listar as relações domínios com sintomas.",
        "info-error": error.message,
      });
    }
  },

  async store(req, res){
    try {

      const {
        domains_symptoms
      } = req.body;

      for (const {domain_id,
        symptom_id,} of domains_symptoms) 
        {
          const domain = await Domain.findByPk(domain_id);

          const symptom = await Symptom.findByPk(symptom_id);
                
          const domain_symptom = await domain.addSymptom(symptom);
        }
            
      return res.status(201).json({
        "message": "Relação Domínio e Sintoma criada com sucesso.",
      });
      
    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para salvar esta relação domínio e sintoma.",
        "info-error": error.message,
      });
    }
  }
}
