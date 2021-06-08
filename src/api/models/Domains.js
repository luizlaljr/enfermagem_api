const {
  Model,
  DataTypes
} = require('sequelize');

class Domains extends Model{
  static init(sequelize){
      super.init({
          name: DataTypes.STRING,
          definition: DataTypes.STRING,
          abstract: DataTypes.TEXT,
      },{
          sequelize,
          tableName: 'domains'
      })
  };

  static associate(models) {
    this.belongsToMany(models.Symptom, {
      foreignKey: 'domain_id',
      through: models.Domain_Symptom,
      as: 'symptoms',
    });
    this.hasMany(models.Domain_Symptom, {
        foreignKey: 'domain_id',
        as: 'domain_symptom',
    })
  }
}

module.exports = Domains;
