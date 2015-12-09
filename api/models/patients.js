/**
 * Created by kent on 9/29/2015.
 */

exports.patientmodel = function patients(sequelize, Sequelize){
    return sequelize.define('patients', {
        UserPK_Patient: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        SysPK_Patient: {
            type:Sequelize.STRING,
            allowNull:false,
            primaryKey: true
        },
        Name_Patient:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        Address_Patient: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Birthdate_Patient: {
            type: Sequelize.DATE,
            allowNull:true
        },
        Gender_Patient: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Status_Patient: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Occupation_Patient: {
            type: Sequelize.TEXT,
            allowNull: false,
            foreignKey: true
        },
        Nationality_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        Religion_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        ContactNumber_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        IsHypertension_Patient: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        YearsHyper_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        MedHyper_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        HBP_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        UBP_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        IsDiabetes_Patient: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        YearsDiabetes_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        MedDiabetes_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        IsOtherMedProblem_Patient: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        OtherMedProblem_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        MedOtherMedProblem_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        OtherMedProblem2_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        MedOtherMedProblem2_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        IsSmoking_Patient: {
            type: Sequelize.INTEGER
        },
        YearsSmoking_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        ConSmoking_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        IsAlcohol_Patient: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        YearsAlcohol_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        ConAlcohol_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        IsAllergies_Patient: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        Allergies_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        IsHPN_Patient: {
            type: Sequelize.INTEGER
        },
        IsDM_Patient: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        IsAsthma_Patient: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        IsOtherHeredoDesease_Patient: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        HeredoDesease_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        HistPastIllness_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        Picture_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        ID_Patient: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    });
}