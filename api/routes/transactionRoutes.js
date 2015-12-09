/**
 * Created by kent on 10/27/2015.
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
var diagnosemodel = require('../models/diagnoses');
var requestmodel = require('../models/requests');
var transactionmodel = require('../models/transactions');
var prescriptionmodel = require('../models/prescriptions');

var Patient = patientmodel.patientmodel(sequelize, Sequelize);
var Doctor = doctormodel.doctormodel(sequelize, Sequelize);
var Transaction = transactionmodel.transactionmodel(sequelize, Sequelize);
var Department = departmentmodel.departmentmodel(sequelize, Sequelize);
var Diagnose = diagnosemodel.diagnosesmodel(sequelize, Sequelize);
var Request = requestmodel.requestmodel(sequelize, Sequelize);
var Prescription = prescriptionmodel.prescriptionmodel(sequelize, Sequelize);

//relationship
Patient.hasMany(Transaction, {foreignKey: 'SysFK_Patient_Trans'});
Doctor.hasMany(Transaction, {foreignKey: 'SysFK_Doctor_Trans'});
Transaction.hasOne(Department, {foreignKey: 'SysFK_Trans_Department'});
Transaction.hasMany(Diagnose, {foreignKey: 'SysFK_Trans_Diagnoses'});
Transaction.hasMany(Request, {foreignKey: 'SysFK_Trans_Request'});
Transaction.hasMany(Prescription, {foreignKey: 'SysFK_Trans_Prescription'});
Transaction.belongsTo(Patient, {foreignKey: 'SysFK_Patient_Trans'});
Transaction.belongsTo(Doctor, {foreignKey: 'SysFK_Doctor_Trans'})
Department.belongsTo(Transaction, {foreignKey: 'SysFK_Trans_Department'});
Diagnose.belongsTo(Transaction, {foreignKey: 'SysFK_Trans_Diagnoses'});
Request.belongsTo(Transaction, {foreignKey: 'SysFK_Trans_Request'});
Prescription.belongsTo(Transaction, {foreignKey: 'SysFK_Trans_Prescription'});

exports.allPatientTransactions = function(req, res){
    Transaction.findAll({where: {'SysFK_Patient_Trans' : req.params.id}, include: [Department,Patient,Doctor]}).then(
        function(transactions){
            res.jsonp(transactions);
        });
};

exports.getDepartmentTransaction = function(req, res){
    Transaction.findAll({where: {'SysPK_Trans' : req.params.id}, include: [Department,Patient,Doctor,Diagnose,Request,Prescription]}).then(
        function(transactions){
            res.jsonp(transactions);
        });
};





exports.allTransactionSurgeries = function(req, res){
    Transaction.findAll({where: {}, include: [Surgery,Department,Patient,Doctor,Diagnose,Request,Prescription]}).then(
        function(transactions){
            res.jsonp(transactions);
        });
};

exports.getTransactionById = function(req, res){
    Transaction.findAll({where: {'SysPK_Trans' : req.params.id}, include: [Department,Patient,Doctor,Diagnose,Request,Prescription]}).then(
        function(transactions){
            res.jsonp(transactions);
        });
};

exports.allTransactionPediatrics = function(req, res){
    Transaction.findAll({where: {}, include: [Pediatric,DepartmentJunction,Patient,Doctor,Diagnose,Request,Prescription]}).then(
        function(transactions){
            res.jsonp(transactions);
        });
};

exports.getTransactionPediatric = function(req, res){
    Transaction.findAll({where: {'SysPK_Trans' : req.params.id}, include: [Pediatric,DepartmentJunction,Patient,Doctor,Diagnose,Request,Prescription]}).then(
        function(transactions){
            res.jsonp(transactions);
        });
};

exports.allTransactionAdultMeds = function(req, res){
    Transaction.findAll({where: {}, include: [AdultMed,DepartmentJunction,Patient,Doctor,Diagnose,Request,Prescription]}).then(
        function(transactions){
            res.jsonp(transactions);
        });
};

exports.getTransactionAdultMed = function(req, res){
    Transaction.findAll({where: {'SysPK_Trans' : req.params.id}, include: [AdultMed,DepartmentJunction,Patient,Doctor,Diagnose,Request,Prescription]}).then(
        function(transactions){
            res.jsonp(transactions);
        });
};

exports.allTransactionObgynes = function(req, res){
    Transaction.findAll({where: {}, include: [Obgyne,DepartmentJunction,Patient,Doctor]}).then(
        function(transactions){
            res.jsonp(transactions);
        });
};

exports.getDiagnoses = function(req, res){
    Transaction.findAll({where: {}, include: [Diagnose]}).then(
        function(transactions){
            res.jsonp(transactions);
        });
};
