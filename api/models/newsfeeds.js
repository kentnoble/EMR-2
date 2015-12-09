/**
 * Created by kent on 11/13/2015.
 */

exports.newsfeedmodel = function newsfeeds(sequelize, Sequelize){
    return sequelize.define('newsfeeds', {
        SysPK_Newsfeed: {
            type:Sequelize.STRING,
            allowNull:false,
            primaryKey: true
        },
        SysFK_Patient_Newsfeed:{
            type: Sequelize.STRING,
            foreignKey: true
        },
        SysFK_Doctor_Newsfeed:{
            type: Sequelize.STRING,
            foreignKey: true
        },
        SysFK_User_Newsfeed: {
            type: Sequelize.STRING,
            foreignKey: true
        },
        Module_Newsfeed: {
            type: Sequelize.TEXT,
            foreignKey: true
        },
        Particulars_Newsfeed: {
            type: Sequelize.TEXT,
            foreignKey: true
        },
        Date_Newsfeed: {
            type: Sequelize.DATE,
            foreignKey: true
        }
    });
}
