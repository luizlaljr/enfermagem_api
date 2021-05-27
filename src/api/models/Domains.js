const {
  Model,
  DataTypes
} = require('sequelize');

class Domains extends Model{
  static init(sequelize){
      super.init({
          name: DataTypes.STRING,
          definition: DataTypes.STRING,
      },{
          sequelize,
          tableName: 'domains'
      })
  };

  static associate(models) {
    this.hasMany(models.Symptom, {
      as: 'domain',
    });
  }
}

module.exports = Domains;
