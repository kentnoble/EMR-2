/**
 * Created by kent on 10/26/2015.
 */

'use strict';

var Sequelize = require('sequelize');

var config = require('../database.json')['dev'];
var password = config.password ? config.password : null;
// initialize database connection
var sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        dialect: config.driver,
        logging: console.log,
        define: {
            timestamps: false
        }
    }
);

//model definitions
var patientmodel = require('../models/patients');
var doctormodel = require('../models/doctors');
var departmentmodel = require('../models/departments');
var transactionmodel = require('../models/transactions');

var Patient = patientmodel.patientmodel(sequelize, Sequelize);
var Doctor = doctormodel.doctormodel(sequelize, Sequelize);
var Transaction = transactionmodel.transactionmodel(sequelize, Sequelize);
var Department = departmentmodel.departmentmodel(sequelize, Sequelize);

//relationship
Patient.hasMany(Transaction, {foreignKey: 'SysFK_Patient_Trans'});
Doctor.hasMany(Transaction, {foreignKey: 'SysFK_Doctor_Trans'});
Department.hasMany(Transaction, {foreignKey: 'SysFK_Department_Trans'});
Transaction.belongsTo(Patient, {foreignKey: 'SysFK_Patient_Trans'});
Transaction.belongsTo(Doctor, {foreignKey: 'SysFK_Doctor_Trans'});
Transaction.belongsTo(Department, {foreignKey: 'SysFK_Department_Trans'});

// function(req, res){
exports.getSurgeryTransactions = function(req, res){
    Transaction.findAll({where: {}, include: [Surgery, Patient, Doctor]}).then(
        function(transactions){
            res.jsonp(transactions);
        });
};

exports.allPatientsSurgeries = function(req, res){
    Transaction.findAll({where: {'Patient.SysPK_Patient' : req.params.id}, include: [Surgery, Patient, Doctor]}).then(
        function(transactions){
            res.jsonp(transactions);
        });
};