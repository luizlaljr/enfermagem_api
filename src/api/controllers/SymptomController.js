const Symptom = require('../models/Symptom');

module.exports = {
  async index(_,res) {
    try {
      const symptom = await Symptom.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
          ]
        }
      });

      return res.status(200).json(symptom);

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para listar os sintoma.",
        "info-error": error.message,
      });
    }
  },

  async store(req, res){
    try {
      const {
        symptoms
      } = req.body;

      for (const {name, domain_id} of symptoms) 
        {
          await Symptom.create({
            name,
            domain_id
          });
        }

      return res.status(201).json({
        "message": "Sintoma criado com sucesso.",
      });
      
    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para salvar este sintoma.",
        "info-error": error.message,
      });
    }
  },

  async show(req, res) {
    try {
      const {
        symptom_id,
      } = req.params;
      const symptom = await Symptom.findByPk(symptom_id);

      return res.status(200).json(symptom);

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para encontrar este sintoma.",
        "info-error": error.message,
      });
    };
  },

  async update(req, res){
    try {
      const {
        symptom_id,
      } = req.params;

      const {
        name,
        domain_id
      } = req.body;

      const symptom = await Symptom.findByPk(symptom_id);

      await Symptom.update(
        {
          name: name == null ? symptom.name : name,
          domain_id: domain_id == null ? symptom.domain_id : domain_id
        },
        {
          where: symptom_id
        }
      )
      
      return res.status(200).json({
        "message": "Sintoma atualizado com sucesso.",
    });

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para atualizar este sintoma.",
        "info-error": error.message,
      });
    }
  },

  async destroy(req, res) {
    try {
      const {
        symptom_id,
      } = req.params;

    
      await Symptom.destroy({
        where: {
          id: symptom_id,
        }
      });

      return res.status(202).json({
        "message": "Sintoma deletado com sucesso.",
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        "message-error": "Houve algum problema para deletar este sintoma.",
        "info-error": error.message,
      });
    }
  }
}
