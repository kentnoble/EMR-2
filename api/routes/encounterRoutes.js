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
var encountermodel = require('../models/encounters');

var Patient = patientmodel.patientmodel(sequelize, Sequelize);
var Doctor = doctormodel.doctormodel(sequelize, Sequelize);
var Encounter = encountermodel.encountermodel(sequelize, Sequelize);

//relationships
Patient.hasMany(Encounter, {foreignKey: 'SysFK_UMPatient_Encounter'});
Doctor.hasMany(Encounter, {foreignKey: 'SysFK_UMDoctor_Encounter'});
Encounter.belongsTo(Patient, {foreignKey: 'SysFK_UMPatient_Encounter'});
Encounter.belongsTo(Doctor, {foreignKey: 'SysFK_UMDoctor_Encounter'});

/////upadted
exports.getEncountersByDoctorNotServe = function(req, res){
    Encounter.findAll({where: {'Doctor.SysPK_Doctor' : req.params.id, 'IsServed_Encounter' : 0, 'Date_Encounter' : req.params.dte}, include: [Patient, Doctor]}).then(
        function(encounters){
            res.jsonp(encounters);
        });
};

exports.getallEncountersByDoctor = function(req, res){
    Encounter.findAll({where: {'Doctor.SysPK_Doctor' : req.params.id, 'Date_Encounter' : req.params.dte}, include: [Doctor]}).then(
        function(encounters){
            res.jsonp(encounters);
        });
};

///
exports.allEncounters = function(req, res){
    Encounter.findAll({where: {}, include: [Patient, Doctor]}).then(
        function(encounters){
            res.jsonp(encounters);
        });
};

exports.allNotServedEncounters = function(req, res){
    Encounter.findAll({where: {'IsServed_Encounter' : 0,'Department_Encounter' : req.params}, include: [Patient, Doctor]}).then(
        function(encounters){
            res.jsonp(encounters);
        });
};

exports.allServedEncounters = function(req, res){
    Encounter.findAll({where: {'IsServed_Encounter' : 1}, include: [Patient, Doctor]}).then(
        function(encounters){
            res.jsonp(encounters);
        });
};

exports.getPatientsEncounters = function(req, res){
    Encounter.findAll({where: {'Patient.SysPK_Patient' : req.params.id}, include: [Patient, Doctor]}).then(
        function(encounters){
            res.jsonp(encounters);
        });
};