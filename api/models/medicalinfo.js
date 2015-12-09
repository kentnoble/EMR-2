/**
 * Created by alain.bibera on 9/26/2015.
 */

exports.medicalinfomodel = function medicalinfo(sequelize, Sequelize){
    return sequelize.define('medicalinfos', {
        SysPK_UMMInfo: {
            type:Sequelize.DECIMAL,
            autoIncrement: true,
            allowNull:false,
            primaryKey: true
        },
        SysFK_UM_UMMInfo:{
            type: Sequelize.DECIMAL,
            allowNull:true,
            foreignKey: true
        },
        IsHypertension_UMMInfo: {
            type: Sequelize.INTEGER,
            allowNull:true
        },
        NoOfYearsHypertension_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        MedicationHypertension_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        HBP_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        UBP_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        IsDiabetes_UMMInfo: {
            type: Sequelize.INTEGER,
            allowNull:true
        },
        NoOfYearsDiabetes_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        MedicationDiabetes_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        IsOthers_UMMInfo: {
            type: Sequelize.INTEGER,
            allowNull:true
        },
        OthersOneProblem_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        OthersOneMedication_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        OthersTwoProblem_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        OthersTwoMedication_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        IsSmoking_UMMInfo: {
            type: Sequelize.INTEGER,
            allowNull:true
        },
        NoOfYearsSmoking_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        ComsumptionSmoking_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        IsAlcohol_UMMInfo: {
            type: Sequelize.INTEGER,
            allowNull:true
        },
        NoOfYearsAlcohol_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        ConsumptionAlcohol_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        IsAlergies_UMMInfo: {
            type: Sequelize.INTEGER,
            allowNull:true
        },
        Allergies_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        IsHPN_UMMInfo: {
            type: Sequelize.INTEGER,
            allowNull:true
        },
        IsDM_UMMInfo: {
            type: Sequelize.INTEGER,
            allowNull:true
        },
        IsAsthma_UMMInfo: {
            type: Sequelize.INTEGER,
            allowNull:true
        },
        IsOthersHeredofamilialDisease_UMMInfo: {
            type: Sequelize.INTEGER,
            allowNull:true
        },
        OthersHeredofamilialDisease_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Remarks_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        HistoryOfPresentIllness_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        HistoryOfPastIllness_UMMInfo: {
            type: Sequelize.TEXT,
            allowNull:true
        }
    });
}