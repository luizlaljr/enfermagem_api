const Diagnosis = require('../models/Diagnosis');

module.exports = {
  async index(_,res) {
    try {
      const diagnosis = await Diagnosis.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
          ]
        }
      });

      return res.status(200).json(diagnosis);

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para listar os diagnósticos.",
        "info-error": error.message,
      });
    }
  },

  async store(req, res){
    try {
      const {
        diagnostics
      } = req.body;

      for (const {name, definition,causes} of diagnostics) 
        {
          await Diagnosis.create({
            name,
            definition,
            causes,
          });
        }

      return res.status(201).json({
        "message": "Diagnóstico criado com sucesso.",
      });
      
    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para salvar este diagnóstico.",
        "info-error": error.message,
      });
    }
  },

  async show(req, res) {
    try {
      const {
        diagnosis_id,
      } = req.params;
      const diagnosis = await Diagnosis.findByPk(diagnosis_id);

      return res.status(200).json(diagnosis);

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para encontrar este diagnóstico.",
        "info-error": error.message,
      });
    };
  },

  async update(req, res){
    try {
      const {
        diagnosis_id,
      } = req.params;

      const {
        name,
        definition,
        causes
      } = req.body;

      const diagnosis = await Diagnosis.findByPk(diagnosis_id);

      await Diagnosis.update(
        {
          name: name == null ? diagnosis.name : name,
          definition: definition == null ? diagnosis.definition : definition,
          causes: causes == null ? diagnosis.causes : causes,
        },
        {
          where: diagnosis_id
        }
      )
      
      return res.status(200).json({
        "message": "Mission updated with sucess.",
    });

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para atualizar este diagnóstico.",
        "info-error": error.message,
      });
    }
  },

  async destroy(req, res) {
    try {
      const {
        diagnosis_id,
      } = req.params;

    
      await Diagnosis.destroy({
        where: {
          id: diagnosis_id,
        }
      });

      return res.status(202).json({
        "message": "Diagnostico deletado com sucesso.",
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        "message-error": "Houve algum problema para deletar este diagnóstico.",
        "info-error": error.message,
      });
    }
  }
}
