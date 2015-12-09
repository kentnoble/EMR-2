/**
 * Created by kent on 11/10/2015.
 */

exports.adultmedmodel = function adultmedicines(sequelize, Sequelize){
    return sequelize.define('adultmedicines', {
        SysPK_AdultMed: {
            type:Sequelize.STRING,
            primaryKey: true,
            allowNull:false
        },
        SysFK_Trans_AdultMed:{
            type: Sequelize.STRING,
            allowNull:false,
            foreignKey: true
        },
        ReasonForEncounter_AdultMed:{
            type: Sequelize.TEXT,
            allowNull:false,
            foreignKey: true
        },
        Symptoms_AdultMed: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        PainLocation_AdultMed: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        SymptomsDesc_AdultMed: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        PainDesc_AdultMed: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        OtherPlan_AdultMed: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Impression_AdultMed: {
            type: Sequelize.TEXT,
            allowNull:true
        }
    });
}

