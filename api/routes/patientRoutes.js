/**
 * Created by kent on 10/28/2015.
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
var hospitalizationmodel = require('../models/hospitalizations');

var Patient = patientmodel.patientmodel(sequelize, Sequelize);
var Hospitalization = hospitalizationmodel.hospitalizationmodel(sequelize, Sequelize);

//relationships
Patient.hasMany(Hospitalization, {foreignKey: 'SysFK_Patient_Hospitalization'});
Hospitalization.belongsTo(Patient, {foreignKey: 'SysFK_Patient_Hospitalization'});

exports.allPatients = function(req, res){
    Patient.findAll({where: {},include: [Hospitalization]}).then(
        function(patients){
            res.jsonp(patients);
        });
};

exports.lastPatientID = function(req, res){
    Patient.findAll({order: 'UserPK_Patient DESC', limit: 1}).then(
        function(patients){
            res.jsonp(patients);
        });
};

exports.getPatient = function(req, res){
    Patient.findAll({where: {'SysPK_Patient' : req.params.id},include: [Hospitalization]}).then(
        function(patient){
            res.jsonp(patient);
        });
};
