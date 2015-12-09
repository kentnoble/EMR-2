/**
 * Created by alain.bibera on 9/16/2015.
 */

 exports.usermodel = function users(sequelize, Sequelize){
    return sequelize.define('users', {
        SysPK_User: {
            type:Sequelize.STRING,
            allowNull:false,
            primaryKey: true
        },
        SysFK_User_User:{
            type: Sequelize.STRING,
            allowNull:true
        },
        SysFK_Role_User: {
            type: Sequelize.STRING,
            allowNull:true
        },
        AccessRights_User: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        UserPK_User: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        UserName_User: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Password_User: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Token_User: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Name_User: {
            type: Sequelize.TEXT,
            allowNull:true
        }
    });
 }
