const {
    Model,
    DataTypes
} = require('sequelize');

class Diagnosis extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            definition: DataTypes.TEXT,
            causes: DataTypes.TEXT,
        },{
            sequelize,
            tableName: 'diagnostics'
        })
    };

    static associate(models) {
        this.belongsToMany(models.Symptom, {
            foreignKey: 'diagnosis_id',
            through: models.Diagnosis_Symptom,
            as: 'symptoms',
        });
        this.hasMany(models.Diagnosis_Symptom, {
            foreignKey: 'diagnosis_id',
            as: 'diagnosis_symptom',
        })
    }
}

module.exports = Diagnosis;
