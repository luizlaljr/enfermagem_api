const Domains = require('../models/Domains');

module.exports = {
  async index(_,res) {
    try {
      const domain = await Domains.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
          ]
        },order:['order']
      });

      return res.status(200).json(domain);

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para listar os domínios.",
        "info-error": error.message,
      });
    }
  },

  async store(req, res){
    try {
      const {
        domains
      } = req.body;

      for (const {name, definition, abstract, order} of domains) 
        {
          await Domains.create({
            name,
            definition,
            abstract,
            order,
          });
        }

      return res.status(201).json({
        "message": "Domínios criado com sucesso.",
      });
      
    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para salvar estes domínios.",
        "info-error": error.message,
      });
    }
  },

  async show(req, res) {
    try {
      const {
        domain_id,
      } = req.params;
      const domain = await Domains.findOne({ where: { order: domain_id } },{
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
          ]
        },include: {
          association:'symptoms',
          attributes: ['id','name']
        }
      });

      return res.status(200).json(domain);

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para encontrar este domínio.",
        "info-error": error.message,
      });
    };
  },

  async update(req, res){
    try {
      const {
        domain_id,
      } = req.params;

      const {
        name,
        definition,
        abstract,
        order,
      } = req.body;

      const domain = await Domains.findByPk(domain_id);

      await Domains.update(
        {
          name: name == null ? domain.name : name,
          definition: definition == null ? domain.definition : definition,
          abstract: abstract == null ? domain.abstract : abstract,
          order: order == null ? domain.order : order,
        },
        {
          where: {id: domain_id}
        }
      )
      
      return res.status(200).json({
        "message": "Domínio atualizado com sucesso.",
    });

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para atualizar este domínio.",
        "info-error": error.message,
      });
    }
  },

  async destroy(req, res) {
    try {
      const {
        domain_id,
      } = req.params;

    
      await Domains.destroy({
        where: {
          id: domain_id,
        }
      });

      return res.status(202).json({
        "message": "Domínio deletado com sucesso.",
      });

    } catch (error) {
      return res.status(500).json({
        "message-error": "Houve algum problema para deletar este domínio.",
        "info-error": error.message,
      });
    }
  }
}
