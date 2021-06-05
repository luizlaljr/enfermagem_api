const {
  Model,
  DataTypes
} = require('sequelize');

class Symptom extends Model{
  static init(sequelize){
      super.init({
          name: DataTypes.STRING,
      },{
          sequelize,
          tableName: 'symptoms'
      })
  };

  static associate(models) {
    this.belongsToMany(models.Diagnosis, {
      foreignKey: 'symptom_id',
      through: models.Diagnosis_Symptom,
      as: 'diagnostics',
    })
    this.hasMany(models.Diagnosis_Symptom, {
      foreignKey: 'symptom_id',
      as: 'diagnosis_symptom',
    })
    this.belongsToMany(models.Domains, {
      foreignKey: 'symptom_id',
      through: models.Domain_Symptom,
      as: 'domains',
    })
    this.hasMany(models.Domain_Symptom, {
      foreignKey: 'symptom_id',
      as: 'domain_symptom',
    })
  }
}

module.exports = Symptom;
