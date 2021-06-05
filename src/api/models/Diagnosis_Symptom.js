const {
  Model,
} = require('sequelize');

class Diagnosis_Symptom extends Model{
  static init(sequelize){
      super.init({},{
        sequelize,
        tableName: 'diagnosis_symptom'
    })
  };

  static associate(models) {
      this.belongsTo(models.Diagnosis, {
          foreignKey: 'diagnosis_id',
          as: 'diagnostics',
      });
      this.belongsTo(models.Symptom, {
          foreignKey: 'symptom_id',
          as: 'symptomsOnDiagnostics',
      });
  }
}

module.exports = Diagnosis_Symptom;
