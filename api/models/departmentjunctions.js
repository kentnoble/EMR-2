/**
 * Created by kent on 10/27/2015.
 */

exports.departmentjunctionmodel = function departmentjunctions(sequelize, Sequelize){
    return sequelize.define('departmentjunctions', {
        SysPK_Department: {
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false
        },
        SysFK_Trans_Department: {
            type:Sequelize.STRING,
            allowNull:false
        },
        SysFK_Dept_Department: {
            type:Sequelize.STRING,
            allowNull:false
        },
        Module_Department:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        Particulars_Department: {
            type: Sequelize.TEXT,
            allowNull:true
        }
    });
}