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
var coamodel = require('../models/coas');
var coatypemodel = require('../models/coatypes');

var COA = coamodel.coamodel(sequelize, Sequelize);
var COAType = coatypemodel.coatypemodel(sequelize, Sequelize);

//relationships
COAType.hasMany(COA, {foreignKey: 'SysFK_Type_COA'});
COA.belongsTo(COAType, {foreignKey: 'SysFK_Type_COA'});

exports.allCOAs = function(req, res){
    COA.findAll({order: 'coatype.ClassParticulars_CoaTM ASC, coatype.UserPK_CoaTM ASC', include: [COAType]}).then(
        function(coas){
            res.jsonp(coas);
        });
};
exports.getCOA = function(req, res){
    COA.findAll({where: {'coas.SysPK_COA' : req.params.id}, include: [COAType]}).then(
        function(coas){
            res.jsonp(coas);
        });
};
