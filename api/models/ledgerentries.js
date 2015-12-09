/**
 * Created by kent on 10/20/2015.
 */

exports.ledgerentrymodel = function ledgerentries(sequelize, Sequelize){
    return sequelize.define('ledgerentries', {
        SysPK_LdgrEntries: {
            type:Sequelize.STRING,
            allowNull:false,
            primaryKey: true
        },
        SysFK_COA_LdgrEntries: {
            type:Sequelize.STRING,
            allowNull: true
        },
        SysFK_Invty_LdgrEntries: {
            type:Sequelize.STRING,
            allowNull: true
        },
        SysFK_LdgrEntriesSL_LdgrEntries: {
            type:Sequelize.STRING,
            allowNull:false
        },
        SysFK_TransH_LdgrEntries: {
            type:Sequelize.STRING,
            allowNull: true
        },
        SysFK_TransHSL_LdgrEntries: {
            type:Sequelize.STRING,
            allowNull: true
        },
        SysFK_UM_LdgrEntries: {
            type:Sequelize.STRING,
            allowNull:false
        },
        UserPK_LdgrEntries: {
            type:Sequelize.STRING,
            allowNull: true
        },
        Module_LdgrEntries: {
            type:Sequelize.STRING,
            allowNull:true
        },
        ModuleTrans_LdgrEntries:{
            type: Sequelize.STRING,
            allowNull:true
        },
        LastUpdatedBy_LdgrEntries: {
            type: Sequelize.STRING,
            allowNull:true
        },
        Status_LdgrEntries: {
            type: Sequelize.STRING,
            allowNull:true
        },
        LastUpdatedDate_LdgrEntries: {
            type: Sequelize.DATE,
            allowNull:true
        },
        DateDue_LdgrEntries: {
            type: Sequelize.DATE,
            allowNull:true
        },
        AmountDue_LdgrEntries: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        AmountPayClr_LdgrEntries: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        BalanceClr_LdgrEntries: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        CRAmount_LdgrEntries: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        DRAmount_LdgrEntries: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        AmountPaid_LdgrEntries: {
            type:Sequelize.DECIMAL,
            allowNull:true
        },
        Balance_LdgrEntries:{
            type: Sequelize.DECIMAL,
            allowNull:true
        },
        Particulars_LdgrEntries:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        PaymentType_LdgrEntries:{
            type: Sequelize.TEXT,
            allowNull:true
        }
    });
}
