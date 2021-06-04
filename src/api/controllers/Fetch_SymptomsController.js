const Symptom = require('../models/Symptom');

const { Op } = require('sequelize');

module.exports = {
  async index(req, res) {
    try {
      const {
        symptom
      } = req.params;

      const symptoms = await Symptom.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'DiagnosisId',
            'SymptomId'
          ]
        },
        include: {
          association: 'diagnostics',
          attributes: ['name'],
          through: {
            attributes: [],                        
          },
          include: {
            association: 'symptoms',
            attributes: ['name'],
            through: {
              attributes: [],                        
            },
          }
        },
        where: {
          name: {
            [Op.iLike]: `%${symptom}%`,
          }
        }
      })

      return res.status(200).json(symptoms)

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para encontrar este diagnóstico.",
        "info-error": error.message,
      });
    }
  }
}
