/**
 * Created by kent on 11/10/2015.
 */

exports.pediatricmodel = function pediatrics(sequelize, Sequelize){
    return sequelize.define('pediatrics', {
        SysPK_Pediatric: {
            type:Sequelize.STRING,
            primaryKey: true,
            allowNull:false
        },
        SysFK_Trans_Pediatric:{
            type: Sequelize.STRING,
            allowNull:false,
            foreignKey: true
        },
        ReasonForEncounter_Pediatric:{
            type: Sequelize.TEXT,
            allowNull:false,
            foreignKey: true
        },
        Symptoms_Pediatric: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        PainLocation_Pediatric: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        SymptomsDesc_Pediatric: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        PainDesc_Pediatric: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        OtherPlan_Pediatric: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Impression_Pediatric: {
            type: Sequelize.TEXT,
            allowNull:true
        }
    });
}

