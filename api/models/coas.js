/**
 * Created by kent on 10/20/2015.
 */

exports.coamodel = function coas(sequelize, Sequelize){
    return sequelize.define('coas', {
        SysPK_COA: {
            type:Sequelize.STRING,
            allowNull:false,
            primaryKey: true
        },
        SysFK_InvtySL_COA: {
            type:Sequelize.STRING,
            allowNull: true
        },
        SysFK_Type_COA: {
            type:Sequelize.STRING,
            allowNull: true
        },
        UserPK_COA: {
            type:Sequelize.STRING,
            allowNull:true
        },
        Class_COA:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        ClassParticulars_COA: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Description_COA: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        InActive_COA: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Particulars_COA: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Status_COA: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        SubClass_COA: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        Title_COA: {
            type: Sequelize.STRING,
            allowNull: true
        },
        BusinessPhone_Doctor: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Type_COA: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    });
}
