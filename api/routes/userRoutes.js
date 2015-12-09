/**
 * Created by kent on 11/11/2015.
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
var usermodel = require('../models/users');
var olusermodel = require('../models/onlineusers');

var User = usermodel.usermodel(sequelize, Sequelize);
var OLUser = olusermodel.olusermodel(sequelize, Sequelize);

exports.getUserByUsername = function(req, res) {
    User.findAll({where: {'UserName_User' : req.params.id}}).then(
        function (user) {
            res.jsonp(user)
        });
}

exports.getUserLogIn = function(req, res) {
    OLUser.findAll({where: {'UserName_OLUser' : req.params.id}}).then(
        function (olusers) {
            res.jsonp(olusers)
        });
}

exports.getToken = function(req, res) {
    OLUser.findAll({where: {'Token_OLUser' : req.params.id}}).then(
        function (olusers) {
            res.jsonp(olusers)
        });
}