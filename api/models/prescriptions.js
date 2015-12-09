/**
 * Created by kent on 10/20/2015.
 */

exports.prescriptionmodel = function prescriptions(sequelize, Sequelize) {
    return sequelize.define('prescriptions', {
        SysPK_Prescription: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        SysFK_Trans_Prescription: {
            type: Sequelize.STRING,
            allowNull:true
        },
        SysFK_Patient_Prescription: {
            type: Sequelize.STRING,
            allowNull:true
        },
        Module_Prescription: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Remarks_Prescription: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Medicine_Prescription: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Form_Prescription: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Strength_Prescription: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        NoOfMedicine_Prescription: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Dosage_Prescription: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Instruction_Prescription: {
            type: Sequelize.TEXT,
            allowNull:true
        }
    });
}
