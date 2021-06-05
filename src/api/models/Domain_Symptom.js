const {
  Model,
} = require('sequelize');

class Domain_Symptom extends Model{
  static init(sequelize){
      super.init({},{
        sequelize,
        tableName: 'domain_symptom'
    })
  };

  static associate(models) {
      this.belongsTo(models.Domains, {
          foreignKey: 'domain_id',
          as: 'domains',
      });
      this.belongsTo(models.Symptom, {
          foreignKey: 'symptom_id',
          as: 'symptomsOnDomains',
      });
  }
}

module.exports = Domain_Symptom;
