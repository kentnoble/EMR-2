/**
 * Created by kent on 10/20/2015.
 */

exports.ledgerinvetorymodel = function ledgerinventories(sequelize, Sequelize){
    return sequelize.define('ledgerinventories', {
        SysPK_LdgrInvty: {
            type:Sequelize.STRING,
            allowNull:false,
            primaryKey: true
        },
        SysFK_Trans_LdgrInvty: {
            type:Sequelize.STRING,
            allowNull: true
        },
        SysFK_Invty_LdgrInvty: {
            type:Sequelize.STRING,
            allowNull: true
        },
        Module_LdgrInvty: {
            type:Sequelize.STRING,
            allowNull:false
        },
        DisplayDescription_LdgrInvty: {
            type:Sequelize.STRING,
            allowNull: true
        },
        DisplayUnitOfMeasure_LdgrInvty: {
            type:Sequelize.STRING,
            allowNull: true
        },
        Particulars_LdgrInvty: {
            type:Sequelize.STRING,
            allowNull:false
        },
        BaseUnitOfMeasure_LdgrInvty: {
            type:Sequelize.STRING,
            allowNull: true
        },
        BaseUnitQtyMultiplier_LdgrInvty: {
            type:Sequelize.DECIMAL,
            allowNull:true
        },
        BaseUnitQtyOut_LdgrInvty:{
            type: Sequelize.DECIMAL,
            allowNull:true
        },
        DisplayQtyIn_LdgrInvty: {
            type: Sequelize.DECIMAL,
            allowNull:true
        },
        DisplayQtyOut_LdgrInvty: {
            type: Sequelize.DECIMAL,
            allowNull:true
        },
        DisplayQtyServed_LdgrInvty: {
            type: Sequelize.DECIMAL,
            allowNull:true
        },
        DisplayUnitSelling_LdgrInvty: {
            type: Sequelize.DECIMAL,
            allowNull:true
        },
        DisplayUnitPurchase_LdgrInvty: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        DisplayForeignConversionRate_LdgInvty: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        DiscountedUnitSelling_LdgrInvty: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        DisplaySubTotalIn_LdgrInvty: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        DisplaySubTotalOut_LdgrInvty: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        SysFK_InvtyPrice_LdgrInvty: {
            type:Sequelize.DECIMAL,
            allowNull:true
        },
        BaseUnitQtyIn_LdgrInvty:{
            type: Sequelize.DECIMAL,
            allowNull:true
        },
        DisplayUnitCOst_LdgrInvty:{
            type: Sequelize.DECIMAL,
            allowNull:true
        }
    });
}
