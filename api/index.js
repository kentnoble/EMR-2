/**
 * Created by alain.bibera on 9/15/2015.
 */
////////// Node.JS INITIALIZATION //////////////

exports.init = function init(){
    var express   = require('express')
        , bodyParser = require('body-parser')
        , Sequelize = require('sequelize')
        , http      = require('http')
        , restful   = require('sequelize-restful')
        , logger    = require('morgan')
        , busboy    = require('connect-busboy')
        , fs        = require('fs-extra')
        , util      = require('util')
        , path      = require('path')
        , _         = require('lodash')
        , conf      = require('./config')
        , jwt       = require('jsonwebtoken')
        , app       = express();

    var userRoutes = require('./routes/userRoutes')
        , encounterRoutes = require('./routes/encounterRoutes')
        , surgeryRoutes = require('./routes/surgeryRoutes')
        , coaRoutes = require('./routes/coaRoutes')
        , patientRoutes = require('./routes/patientRoutes')
        , doctorRoutes = require('./routes/doctorRoutes')
        , transactionRoutes = require('./routes/transactionRoutes')
        , newsfeedRoutes = require('./routes/newsfeedRoutes')
        , userRoutes = require('./routes/userRoutes');

    app.get('/users/:id', userRoutes.getUserByUsername);

    app.get('/onlineuser/:id', userRoutes.getUserLogIn);
    app.get('/onlineusertoken/:id', userRoutes.getToken);

    app.get('/patients/:id', patientRoutes.getPatient);
    app.get('/lastPatientID', patientRoutes.lastPatientID);

    app.get('/lastDoctorID', doctorRoutes.lastDoctorID);

    app.get('/getEncountersByDoctorNotServe/:id/:dte', encounterRoutes.getEncountersByDoctorNotServe);
    app.get('/getallEncountersByDoctor/:id/:dte', encounterRoutes.getallEncountersByDoctor);

    app.get('/getAllNewsfeeds', newsfeedRoutes.getAllNewsfeeds);



    app.get('/encounters', encounterRoutes.allEncounters);
    app.get('/encounters/notserve', encounterRoutes.allNotServedEncounters);
    app.get('/encounters/served', encounterRoutes.allServedEncounters);

    app.get('/patientTransactions/:id', transactionRoutes.allPatientTransactions);
    app.get('/departmentTransactions/:id', transactionRoutes.getDepartmentTransaction);

    app.get('/transactions/pediatric', transactionRoutes.allTransactionPediatrics);
    app.get('/transactions/pediatric/:id', transactionRoutes.getTransactionPediatric);

    app.get('/transactions/adultmedicine', transactionRoutes.allTransactionAdultMeds);
    app.get('/transactions/adultmedicine/:id', transactionRoutes.getTransactionAdultMed);

    app.get('/coas', coaRoutes.allCOAs);
    app.get('/coas/:id', coaRoutes.getCOA);

    var port = process.env.PORT || 3001;
    app.use(express.static(path.join(__dirname, '../public/')));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(busboy());

    app.all('/*', function(req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });
    //use node-config to handle environments

    //initialize database connection using node-config
    var env = 'dev';
    var config = require('./database.json')[env];
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

    /////////// MODELS DEFINITIONS /////////////////
    var usermodel = require('./models/users');
    var olusermodel = require('./models/onlineusers');
    var patientmodel = require('./models/patients');
    var doctormodel = require('./models/doctors');
    var newsfeedmodel = require('./models/newsfeeds');
    var encountermodel = require('./models/encounters');
    var transactionmodel = require('./models/transactions');
    var coamodel = require('./models/coas');
    var coatypemodel = require('./models/coatypes');
    var prescriptionmodel = require('./models/prescriptions');
    var inventorymodel = require('./models/inventories');
    var ledgerinventorymodel = require('./models/ledgerinventories');
    var ledgerentrymodel = require('./models/ledgerentries');
    var icdmodel = require('./models/icd10s');
    var diagnosesmodel = require('./models/diagnoses');
    var medicalinfo = require('./models/medicalinfo');
    var departmentmodel = require('./models/departments');
    var pediatricmodel = require('./models/pediatrics');
    var adultmedmodel = require('./models/adultmedicines');
    var departmentjunctionmodel = require('./models/departmentjunctions');
    var hospitalizationmodel = require('./models/hospitalizations');
    var requestmodel = require('./models/requests');


    var User = usermodel.usermodel(sequelize, Sequelize);
    var OLUser = olusermodel.olusermodel(sequelize, Sequelize);
    var Patient = patientmodel.patientmodel(sequelize, Sequelize);
    var Doctor = doctormodel.doctormodel(sequelize, Sequelize);
    var Newsfeed = newsfeedmodel.newsfeedmodel(sequelize, Sequelize);
    var Encounter = encountermodel.encountermodel(sequelize, Sequelize);
    var DepartmentJunction = departmentjunctionmodel.departmentjunctionmodel(sequelize, Sequelize);
    var Transaction = transactionmodel.transactionmodel(sequelize, Sequelize);
    var Department = departmentmodel.departmentmodel(sequelize, Sequelize);
    var Pediatric = pediatricmodel.pediatricmodel(sequelize, Sequelize);
    var AdultMed = adultmedmodel.adultmedmodel(sequelize, Sequelize);
    var Prescription = prescriptionmodel.prescriptionmodel(sequelize, Sequelize);
    var Inventory = inventorymodel.invetorymodel(sequelize, Sequelize);
    var LedgerInventory = ledgerinventorymodel.ledgerinvetorymodel(sequelize, Sequelize);
    var LedgerEntry = ledgerentrymodel.ledgerentrymodel(sequelize, Sequelize);
    var COA = coamodel.coamodel(sequelize, Sequelize);
    var COAType = coatypemodel.coatypemodel(sequelize, Sequelize);
    var ICD = icdmodel.icdmodel(sequelize, Sequelize);
    var Diagnose = diagnosesmodel.diagnosesmodel(sequelize, Sequelize);
    var Hospitalization = hospitalizationmodel.hospitalizationmodel(sequelize, Sequelize);
    var Request = requestmodel.requestmodel(sequelize, Sequelize);

    /////////// MAGICAL PIECE OF CODE /////////////
    app.use(restful(sequelize));
    ///////////////////////////////////////////////

    function createJWT(user) {
        return jwt.sign(_.omit(user, 'password'), conf.secret, { expiresInMinutes: 60 });
    }

    app.post('/auth/login', function(req, res) {
        User.findAll({where: {'UserName_User' : req.body.UserName_User, 'Password_User' : req.body.Password_User}}).then(
            function(user){
                if (user.length === 0) {
                    return res.status(401).send({ message: 'Wrong username and / or password' });
                }
                else {
                    res.send({token: createJWT(user)});
                }
            });

            /*user.comparePassword(req.body.password, function(err, isMatch) {
                if (!isMatch) {
                    return res.status(401).send({ message: 'Wrong email and/or password' });
                }
                res.send({ token: createJWT(user) });
            }); */
    });

    //to upload file
    app.route('/upload').put(function (req, res, next) {
            var fstream;
            req.pipe(req.busboy);
            req.busboy.on('file', function (fieldname, file, filename) {
                console.log("Uploading: " + filename);

                //Path where image will be uploaded
                fstream = fs.createWriteStream(__dirname + '/../public/assets/img/' + filename);

                file.pipe(fstream);

                fstream.on('close', function () {
                    console.log("Upload Finished of " + filename);
                    res.redirect('back');				//where to go next
                });
            });
        });
    /////////// LAUNCH THE SERVER /////////////////
    app.listen(port);
    console.log('Listening to port ' + port);
    ////////////////////////////////////////////////
};