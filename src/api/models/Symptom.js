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
      });
      this.hasMany(models.Diagnosis_Symptom, {
          as: 'diagnosis_symptom',
      })
  }
}

module.exports = Symptom;
