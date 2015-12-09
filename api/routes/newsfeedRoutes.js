/**
 * Created by kent on 12/8/2015.
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
var newsfeedmodel = require('../models/newsfeeds');
var doctormodel = require('../models/doctors');
var patientmodel = require('../models/patients');
var usermodel = require('../models/users');

var Newsfeed = newsfeedmodel.newsfeedmodel(sequelize, Sequelize);
var Patient = patientmodel.patientmodel(sequelize, Sequelize);
var Doctor = doctormodel.doctormodel(sequelize, Sequelize);
var User = usermodel.usermodel(sequelize, Sequelize);

//relationship
Patient.hasMany(Newsfeed, {foreignKey: 'SysFK_Patient_Newsfeed'});
Doctor.hasMany(Newsfeed, {foreignKey: 'SysFK_Doctor_Newsfeed'});
User.hasMany(Newsfeed, {foreignKey: 'SysFK_User_Newsfeed'});
Newsfeed.belongsTo(Patient, {foreignKey: 'SysFK_Patient_Newsfeed'});
Newsfeed.belongsTo(Doctor, {foreignKey: 'SysFK_Doctor_Newsfeed'})
Newsfeed.belongsTo(User, {foreignKey: 'SysFK_User_Newsfeed'});

exports.getAllNewsfeeds = function(req, res){
    Newsfeed.findAll({where: {}, include: [Patient,Doctor,User]}).then(
        function(newsfeeds){
            res.jsonp(newsfeeds);
        });
};
