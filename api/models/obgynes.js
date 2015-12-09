/**
 * Created by kent on 10/27/2015.
 */

exports.obgynemodel = function obgynes(sequelize, Sequelize) {
    return sequelize.define('obgynes', {
        SysPK_Surgery: {
            type: Sequelize.STRING,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        SysFK_Trans_Surgery: {
            type: Sequelize.STRING,
            allowNull: false,
            foreignKey: true
        }
    });
}
