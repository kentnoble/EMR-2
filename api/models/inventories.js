/**
 * Created by kent on 10/20/2015.
 */

exports.invetorymodel = function inventories(sequelize, Sequelize){
    return sequelize.define('inventories', {
        SysPK_Invty: {
            type:Sequelize.STRING,
            allowNull:false,
            primaryKey: true
        },
        SysFK_BatchInvty_Invty: {
            type:Sequelize.STRING,
            allowNull: true
        },
        SysFK_COACostOfGoods_Invty: {
            type:Sequelize.STRING,
            allowNull: true
        },
        SysFK_COAInventory_Invty: {
            type:Sequelize.STRING,
            allowNull:false
        },
        SysFK_COASales_Invty: {
            type:Sequelize.STRING,
            allowNull: true
        },
        SysFK_LastPurchase_Invty: {
            type:Sequelize.STRING,
            allowNull: true
        },
        SysFK_LastSales_Invty: {
            type:Sequelize.STRING,
            allowNull:false
        },
        SysFK_TransH_Invty: {
            type:Sequelize.STRING,
            allowNull: true
        },
        UserPK_Invty: {
            type:Sequelize.STRING,
            allowNull:true
        },
        LastUpdatedBy_Invty:{
            type: Sequelize.STRING,
            allowNull:true
        },
        LastUpdatedDate_Invty: {
            type: Sequelize.DATE,
            allowNull:true
        },
        BarCode_Invty: {
            type: Sequelize.STRING,
            allowNull:true
        },
        BaseUnitOfMeasure_Invty: {
            type: Sequelize.STRING,
            allowNull:true
        },
        Brand_Invty: {
            type: Sequelize.STRING,
            allowNull:true
        },
        CurrentCost_Invty: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        Category_Invty: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Classification_Invty: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Description_Invty: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Group_Invty: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Module_Invty: {
            type:Sequelize.STRING,
            allowNull:true
        },
        Particulars_Invty:{
            type: Sequelize.STRING,
            allowNull:true
        },
        PictureFileName_Invty: {
            type: Sequelize.STRING,
            allowNull:true
        },
        RestockingQty_invty: {
            type: Sequelize.STRING,
            allowNull:true
        },
        Status_Invty: {
            type: Sequelize.STRING,
            allowNull:true
        },
        SubCategory_invty: {
            type: Sequelize.STRING,
            allowNull:true
        },
        SubGroup_invty: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        Type_Invty: {
            type: Sequelize.STRING,
            allowNull: true
        },
        BaseUnitQty_Invty: {
            type: Sequelize.STRING,
            allowNull: true
        },
        PurchQty_Invty: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Price_Invty: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
}
