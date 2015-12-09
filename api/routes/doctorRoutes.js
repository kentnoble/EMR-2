/**
 * Created by kent on 11/13/2015.
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
var doctormodel = require('../models/doctors');

var Doctor = doctormodel.doctormodel(sequelize, Sequelize);

//relationships

exports.lastDoctorID = function(req, res){
    Doctor.findAll({order: 'UserPK_Doctor DESC', limit: 1}).then(
        function(doctors){
            res.jsonp(doctors);
        });
};
