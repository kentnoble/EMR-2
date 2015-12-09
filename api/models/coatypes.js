/**
 * Created by kent on 10/20/2015.
 */

exports.coatypemodel = function coatypes(sequelize, Sequelize){
    return sequelize.define('coatypes', {
        SysPK_CoaTM: {
            type:Sequelize.STRING,
            allowNull:false,
            primaryKey: true
        },
        UserPK_CoaTM: {
            type:Sequelize.STRING,
            allowNull:true
        },
        Module_CoaTM:{
            type: Sequelize.STRING,
            allowNull:true
        },
        Class_CoaTM: {
            type: Sequelize.INTEGER,
            allowNull:true
        },
        ClassParticulars_CoaTM: {
            type: Sequelize.STRING,
            allowNull:true
        },
        SidePositive_CoaTM: {
            type: Sequelize.STRING,
            allowNull:true
        }
    });
}
