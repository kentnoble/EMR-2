/**
 * Created by kent on 10/24/2015.
 */

exports.icdmodel = function icd10s(sequelize, Sequelize){
    return sequelize.define('icd10s', {
        SysPK_ICD: {
            type:Sequelize.STRING,
            autoIncrement: true,
            allowNull:false
        },
        ICDCode_ICD:{
            type: Sequelize.STRING,
            allowNull:false,
            primaryKey: true
        },
        Group_ICD:{
            type: Sequelize.TEXT,
            allowNull:false,
            foreignKey: true
        },
        Description_ICD: {
            type: Sequelize.TEXT,
            allowNull:true
        }
    });
}
