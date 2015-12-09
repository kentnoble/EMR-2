/**
 * Created by kent on 10/17/2015.
 */

exports.transactionmodel = function transactions(sequelize, Sequelize){
    return sequelize.define('transactions', {
        SysPK_Trans: {
            type:Sequelize.STRING,
            allowNull:false,
            primaryKey: true
        },
        SysFK_Patient_Trans:{
            type: Sequelize.STRING,
            allowNull:false,
            foreignKey: true
        },
        SysFK_Doctor_Trans:{
            type: Sequelize.STRING,
            allowNull:false,
            foreignKey: true
        },
        SysFK_Department_Trans:{
            type: Sequelize.STRING,
            allowNull:false,
            foreignKey: true
        },
        TransID_Trans:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        Date_Trans:{
            type: Sequelize.DATE,
            allowNull:true
        },
        TotalAmount_Trans:{
            type: Sequelize.DECIMAL,
            allowNull:true
        },
        Module_Trans:{
            type: Sequelize.TEXT,
            allowNull:true
        }
    });
}