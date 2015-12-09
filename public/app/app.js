/**
 * Created by alain.bibera on 8/18/2015.
*/

'use strict';

var app=angular.module('mdrApp',[
    'uuid',
    'ngRoute',
    'ngCookies',
    'toastr',
    'mdrApp.angular-confirm',
    'angularFileUpload',
    'ngAnimate',
    'ngSanitize',
    'mgcrea.ngStrap',
    'angular-jwt',
    'angular-storage',
    'ui.router',
    'satellizer']);

app.controller('MainCtrl', ['$scope', '$auth', '$rootScope', '$cookieStore', 'Base64', function($scope, $auth, $rootScope, $cookieStore, Base64) {
    $rootScope.user = {}
    var user = $cookieStore.get('globals') || undefined;
    if(user !== undefined){
        $rootScope.user.name = Base64.decode(user.currentUser.n);
        $rootScope.user.rights = Base64.decode(user.currentUser.rol);
        $rootScope.user.sysfk = Base64.decode(user.currentUser.fk);
        $rootScope.user.syspk = Base64.decode(user.currentUser.sys);
    };

    $scope.isAuthenticated = function () {
        return $auth.isAuthenticated();
    };

    if(!$cookieStore.get('globals')) {
        $auth.removeToken();
    }

    /*$scope.isAuthenticatedDatabase = function () {
        var isSignedIn = false;
        oluserDataFactory.getOLUserToken().then(function(res){
            if(res.data.length !== 0 ){
                isSignedIn = true;
            }else{
                isSignedIn = false ;
            }
        });
        if($scope.isAuthenticated && isSignedIn) {
            return true;
        }else{
            return false;
        }
    }; */
}]);

app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});

app.filter('iif', function () {
    return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
    };
});
app.config(function($stateProvider){
    $stateProvider
        .state('/', {
            url: '',
            controller: 'LoginCtrl',
            templateUrl: 'app/user/login/login.html',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .state('user-setup', {
            url: '/user-setup',
            controller: 'RegisterCtrl',
            templateUrl: 'app/user/register/register.html',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('login', {
            url: '/login',
            controller: 'LoginCtrl',
            templateUrl: 'app/user/login/login.html',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .state('logout', {
            url: '/logout',
            template: null,
            controller: 'LoginCtrl'
        })
        .state('newsfeed', {
            url: '/newsfeed',
            controller: 'NewsfeedCtrl',
            templateUrl: 'app/newsfeed/newsfeed.html',
            resolve: {
                loginRequired: loginRequired
            }
        })
            ////PATIENTS ROUTES
        .state('patients', {
            url: '/patients',
            controller: 'PatientListCtrl',
            templateUrl: 'app/setup/patient/patientList.html',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('patients/:id', {
            url: '/patients/:id',
            controller: 'PatientInfoController',
            templateUrl: 'app/setup/patient/patientInfo.html',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('patient-setup', {
            url: '/patient-setup',
            controller: 'PatientSetupCtrl',
            templateUrl: 'app/setup/patient/patientSetup.html',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('patient-setup/:id', {
            url: '/patient-setup/:id',
            controller: 'PatientSetupCtrl',
            templateUrl: 'app/setup/patient/patientSetup.html',
            resolve: {
                loginRequired: loginRequired
            }
        })
        ////DOCTOR ROUTES
        .state('doctors', {
            url: '/doctors',
            controller: 'DoctorListCtrl',
            templateUrl: 'app/setup/doctor/doctorList.html',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('doctor-setup', {
            url: '/doctor-setup',
            controller: 'DoctorSetupCtrl',
            templateUrl: 'app/setup/doctor/doctorSetup.html',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('encounters', {
            url: '/encounters',
            templateUrl: "app/encounter/patientEncounterList.html",
            controller: "patientEncounterListCtrl",
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('patient-encounter', {
            url: '/patient-encounter',
            templateUrl: "app/encounter/patientencounterSetup.html",
            controller: "patientEncounterSetupController",
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('patient-encounter/:id', {
            url: '/patient-encounter/:id',
            templateUrl: "app/encounter/patientencounterSetup.html",
            controller: "patientEncounterSetupController",
            resolve: {
                loginRequired: loginRequired
            }
        })
    /////DEPARTMENTS
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: "app/dashboard/dashboard.html",
            controller: "dashboardController",
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('dashboard/:id', {
            url: '/dashboard/:id',
            templateUrl: "app/dashboard/dashboard.html",
            controller: "dashboardController",
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('pediatrics', {
            url: '/pediatrics',
            templateUrl: "app/setup/pediatric/pediatric.html",
            controller: "pediatricController",
            resolve: {
                loginRequired: loginRequired
            }
        });

    function skipIfLoggedIn($q, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.resolve();
        } else {
            //$auth.removeToken();
            $location.path('/login');
        }
        return deferred.promise;
    };

    /*

    ////PATIENT ROUTES
    $routeProvider.when('/patients',
        {
            templateUrl: "setup/patient/patientList.html",
            controller: "patientController"
        });
    $routeProvider.when('/patients/:id',
        {
            templateUrl: "setup/patient/patientInfo.html",
            controller: "patientController"
        });
    $routeProvider.when('/patient-setup',
        {
            templateUrl: "setup/patient/patientSetup.html",
            controller: "patientController"
        });
    $routeProvider.when('/patient-setup/:id',
        {
            templateUrl: "setup/patient/patientSetup.html",
            controller: "patientController"
        });////END PATIENT ROUTES

    ////DOCTOR ROUTES
    $routeProvider.when('/doctors',
        {
            templateUrl: "setup/doctor/doctorList.html",
            controller: "doctorController"
        });
    $routeProvider.when('/doctor-setup',
        {
            templateUrl: "setup/doctor/doctorSetup.html",
            controller: "doctorController"
        });
    $routeProvider.when('/doctor-setup/:id',
        {
            templateUrl: "setup/doctor/doctorSetup.html",
            controller: "doctorController"
        });////END DOCTOR ROUTES

    ////COA ROUTES
    $routeProvider.when('/coas',
        {
            templateUrl: "setup/coa/coaList.html",
            controller: "coaController"
        });
    $routeProvider.when('/coa-setup',
        {
            templateUrl: "setup/ca/coaSetup.html",
            controller: "coaController"
        });
    $routeProvider.when('/coa-setup/:id',
        {
            templateUrl: "setup/doctor/coaSetup.html",
            controller: "coaController"
        });////END COA ROUTES

    $routeProvider.when('/patient-encounter/:id',
        {
            templateUrl: "encounter/patientencounterSetup.html",
            controller: "patientEncounterController"
        });
    ////SURGERY ROUTES
    $routeProvider.when('/transactions/department',
        {
            templateUrl: "setup/department/department.html",
            controller: "surgeryController"
        });
    $routeProvider.when('/transactions/department/:id',
        {
            templateUrl: "setup/department/department.html",
            controller: "surgeryController"
        });////END

    ////OB ROUTES
    $routeProvider.when('/transactions/ob-gyne',
        {
            templateUrl: "setup/obgyne/obgyne.html",
            controller: "obgyneController"
        });
    $routeProvider.when('/transactions/ob-gyne/:id',
        {
            templateUrl: "setup/obgyne/obgyne.html",
            controller: "obgyneController"
        });////END

    ////PEDIATRIC ROUTES
    $routeProvider.when('/transactions/pediatric',
        {
            templateUrl: "setup/pediatric/pediatric.html",
            controller: "pediatricController"
        });
    $routeProvider.when('/transactions/pediatric/:id',
        {
            templateUrl: "setup/pediatric/pediatric.html",
            controller: "pediatricController"
        });////END

    ////ADULT MEDICINE ROUTES
    $routeProvider.when('/transactions/adultmedicine',
        {
            templateUrl: "setup/adultmedicine/adultmedicine.html",
            controller: "adultmedicineController"
        });
    $routeProvider.when('/transactions/adultmedicine/:id',
        {
            templateUrl: "setup/adultmedicine/adultmedicine.html",
            controller: "adultmedicineController"
        }); ////END */
});