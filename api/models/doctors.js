/**
 * Created by kent on 10/9/2015.
 */

exports.doctormodel = function doctors(sequelize, Sequelize){
    return sequelize.define('doctors', {
        SysPK_Doctor: {
            type:Sequelize.STRING,
            allowNull:false,
            primaryKey: true
        },
        UserPK_Doctor:{
            type: Sequelize.INTEGER,
            allowNull:false,
            autoIncrement: true
        },
        IDNumber_Doctor:{
            type: Sequelize.TEXT,
            allowNull:true
        },
        Name_Doctor: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Address_Doctor: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        License_Doctor: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        PTR_Doctor: {
            type: Sequelize.TEXT,
            allowNull:true
        },
        Specialization_Doctor: {
            type: Sequelize.TEXT,
            allowNull: false,
            foreignKey: true
        },
        S2_Doctor: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        HomePhone_Doctor: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        OfficePhone_Doctor: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        BusinessPhone_Doctor: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ContactNumber_Doctor: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        Picture_Doctor: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    });
}
