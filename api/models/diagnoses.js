/**
 * Created by alain.bibera on 9/29/2015.
 */

exports.diagnosesmodel = function diagnoses(sequelize, Sequelize) {
    return sequelize.define('diagnoses', {
        SysPK_Diagnoses: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        SysFK_Trans_Diagnoses:{
            type: Sequelize.DECIMAL,
            allowNull:true,
            foreignKey: true
        },
        SysFK_ICD10_Diagnoses:{
        type: Sequelize.DECIMAL,
            allowNull:true,
            foreignKey: true
        },
        Diagnoses_Diagnoses: {
            type: Sequelize.TEXT,
            allowNull:true
        }
    });
}