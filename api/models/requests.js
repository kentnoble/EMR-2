/**
 * Created by kent on 10/30/2015.
 */

exports.requestmodel = function requests(sequelize, Sequelize){
    return sequelize.define('requests', {
        SysPK_Request: {
            type:Sequelize.STRING,
            allowNull:false,
            primaryKey: true
        },
        SysFK_Trans_Request:{
            type: Sequelize.STRING,
            allowNull:false,
            foreignKey: true
        },
        SysFK_Patient_Request:{
            type: Sequelize.TEXT,
            allowNull:false,
            foreignKey: true
        },
        Particular_Request: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Module_Request: {
            type: Sequelize.TEXT,
            allowNull:true
        }
    });
}