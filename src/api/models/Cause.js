const {
  Model,
  DataTypes
} = require('sequelize');

class Cause extends Model{
  static init(sequelize){
      super.init({
          name: DataTypes.STRING,
      },{
          sequelize,
          tableName: 'causes'
      })
  };

  static associate(models) {
    this.belongsTo(models.Diagnosis, {
      foreignKey: 'diagnosis_id',
      as: 'diagnosis',
    });
  }
}

module.exports = Cause;
