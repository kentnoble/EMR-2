/**
 * Created by alain.bibera on 9/17/2015.
 */
exports.encountermodel = function encounters(sequelize, Sequelize){
    return sequelize.define('encounters', {
        SysPK_Encounter: {
            type:Sequelize.STRING,
            allowNull:false,
            primaryKey: true
        },
        SysFK_UMDoctor_Encounter:{
            type: Sequelize.STRING,
            allowNull:false,
            foreignKey: true
        },
        SysFK_UMPatient_Encounter:{
            type: Sequelize.STRING,
            allowNull:false,
            foreignKey: true
        },
        ReasonForEncounter_Encounter: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Department_Encounter: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Date_Encounter: {
            type: Sequelize.DATE,
            allowNull:false
        },
        BP_Encounter: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        HR_Encounter: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        RR_Encounter: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Weight_Encounter: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        IsServed_Encounter: {
            type: Sequelize.INTEGER,
            allowNull:true
        },
        PriorityNumber_Encounter: {
            type: Sequelize.INTEGER,
            allowNull:true
        }
    });
}