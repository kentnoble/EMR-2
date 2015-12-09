/**
 * Created by alain.bibera on 9/21/2015.
 */

exports.departmentmodel = function departments(sequelize, Sequelize){
    return sequelize.define('departments', {
        SysPK_Department: {
            type:Sequelize.STRING,
            allowNull:false,
            primaryKey: true
        },
        SysFK_Trans_Department:{
            type: Sequelize.STRING,
            allowNull:false,
            foreignKey: true
        },
        VisitCount_Department:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        Module_Department:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        ReasonForEncounter_Department:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        Impression_Department:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        OtherPlan_Department:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        //pedia
        Symptoms_Medicine: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        PainLocation_Medicine: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        SymptomsDesc_Medicine: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        PainDesc_Medicine: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        //surgery
        MassesDescription_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        MolesDescription_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        PainDescription_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        DischargeDescription_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        Masses_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        Moles_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        Pain_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        Discharge_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        HEENT_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        HEENTDescription_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        Duration_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        Severity_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        MonthsHPI_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        YearsHPI_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        HPI_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        Skin_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        CL_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        Genitalia_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        Extremities_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        Rectal_Surgery:{
            type: Sequelize.TEXT,
            allowNull:true
        }
    });
}