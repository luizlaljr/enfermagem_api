const Cause = require('../models/Cause');

module.exports = {
  async index(_,res) {
    try {
      const cause = await Cause.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
          ]
        }
      });

      return res.status(200).json(cause);

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para listar as causas.",
        "info-error": error.message,
      });
    }
  },

  async store(req, res){
    try {
      const {
        causes,
      } = req.body;

      for (const {name, diagnosis_id} of causes) 
        {
          await Cause.create({
            name,
            diagnosis_id
          });
        }

      return res.status(201).json({
        "message": "Sintoma criado com sucesso.",
      });
      
    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para salvar esta causa.",
        "info-error": error.message,
      });
    }
  },

  async show(req, res) {
    try {
      const {
        cause_id,
      } = req.params;
      const cause = await Cause.findByPk(cause_id);

      return res.status(200).json(cause);

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para encontrar esta causa.",
        "info-error": error.message,
      });
    };
  },

  async update(req, res){
    try {
      const {
        cause_id,
      } = req.params;

      const {
        name
      } = req.body;

      const cause = await Cause.findByPk(cause_id);

      await Cause.update(
        {
          name: name == null ? cause.name : name,
        },
        {
          where: cause_id
        }
      )
      
      return res.status(200).json({
        "message": "Causa atualizada com sucesso.",
    });

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para atualizar esta causa.",
        "info-error": error.message,
      });
    }
  },

  async destroy(req, res) {
    try {
      const {
        cause_id,
      } = req.params;

    
      await Cause.destroy({
        where: {
          id: cause_id,
        }
      });

      return res.status(202).json({
        "message": "Causa deletada com sucesso.",
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        "message-error": "Houve algum problema para deletar este causa.",
        "info-error": error.message,
      });
    }
  }
}
