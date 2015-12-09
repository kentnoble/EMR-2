/**
 * Created by kent on 11/26/2015.
 */

exports.olusermodel = function onlineusers(sequelize, Sequelize){
    return sequelize.define('onlineusers', {
        SysPK_OLUser: {
            type:Sequelize.STRING,
            allowNull:false,
            primaryKey: true
        },Token_OLUser: {
            type:Sequelize.STRING,
            allowNull:false
        },
        UserName_OLUser:{
            type: Sequelize.TEXT,
            allowNull:false
        }
    });
}

