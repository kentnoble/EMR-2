/**
 * Created by kent on 10/28/2015.
 */

exports.hospitalizationmodel = function hospitalizations(sequelize, Sequelize){
    return sequelize.define('hospitalizations', {
        SysPK_Hospitalization: {
            type:Sequelize.STRING,
            allowNull:false,
            primaryKey: true
        },
        SysFK_Patient_Hospitalization:{
            type: Sequelize.STRING,
            foreignKey:true
        },
        Year_Hospitalization: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Hospital_Hospitalization: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Remarks_Hospitalization: {
            type: Sequelize.TEXT,
            allowNull:true
        }
    });
}
