/**
 * Created by kent on 8/31/2015.
 */
'use strict';

app.controller('PatientListCtrl',['$scope', 'patientDataFactory', '$location','toastr','filterFilter','$confirm',
    function($scope, patientDataFactory, $location, toastr ,filterFilter,$confirm){
        $scope.patients = [];
        $scope.id = '';
        patientDataFactory.getPatients().then(function(data) {
            $scope.patients = data.data;
            //pagination and search
            $scope.search = {};
            $scope.resetFilters = function () {
                // needs to be a function or it won't trigger a $watch
                $scope.search = {};
            };
            // pagination controls
            $scope.currentPage = 1;
            $scope.totalItems = $scope.patients.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
            // $watch search to update pagination
            $scope.$watch('search', function (newVal, oldVal) {
                $scope.filtered = filterFilter($scope.patients.data, newVal);
                $scope.totalItems = $scope.filtered.length;
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                $scope.currentPage = 1;
            }, true);
        });

        $scope.setID = function(patient){
            $scope.id = patient.SysPK_Patient;

            if ($scope.lastSelected) {
                $scope.lastSelected.selected = '';
            }
            this.selected = 'active';
            $scope.lastSelected = this;
        };
        $scope.deletepatient = function(){
            if($scope.id !='') {
                $confirm({text: 'Are you sure you want to delete?', title: 'Confirm', ok: 'Yes', cancel: 'No'})
                    .then(function () {
                        patientDataFactory.deletePatient($scope.id).success(function () {
                            patientDataFactory.getPatients().then(function (data) {
                                $scope.patients = data.data;
                                $scope.id = '';
                                toastr.success('Patient successfully deleted.');
                            });
                        });
                    });
            }else{
                toastr.error('Please select patient to delete.');
            }

        };
        $scope.gotoUpdate = function(path){
            if($scope.id !=''){
                console.log(path + $scope.id);
                $location.path(path + $scope.id);
            }else{
                toastr.error('Please select patient to update.');
            }
        };
    }
]);

app.controller('PatientSetupCtrl',['$scope', 'patientDataFactory', 'transactionDataFactory', 'hospitalizationDataFactory', '$location', '$window', '$filter','$stateParams','toastr', '$confirm','rfc4122','filterFilter','$timeout','$upload',
    function($scope, patientDataFactory, transactionDataFactory, hospitalizationDataFactory, $location, $window, $filter, $stateParams, toastr, $confirm, rfc4122,filterFilter, $timeout, $upload){
        $scope.patient = {};
        $scope.hospitals = [];
        $scope.dataUrls = '../assets/img/avatar_2xx.png';
        if($stateParams.id){
            patientDataFactory.getPatient($stateParams.id).then(function(data) {
                $scope.patient = data.data[0];
                if($scope.patient !== undefined){
                    $scope.hospitals = $scope.patient.hospitalizations;
                    $scope.dataUrls = '../assets/img/' + $scope.patient.Picture_Patient;
                    transactionDataFactory.getTransactions($scope.patient.SysPK_Patient).then(function(data){
                        $scope.transactions = data;
                        console.log('Data Encounter ' + data.data);
                    });
                }
                else{
                    toastr.error("No Record Found");
                    $location.path('/patients');
                }
            });
        }
        else{
            patientDataFactory.getLastPatientID().then(function(data){
                if(data.data.length !== 0) {
                    $scope.patient.UserPK_Patient = data.data[0].UserPK_Patient + 1;
                    var zeroes = '';
                    if(data.data[0].UserPK_Patient.toString().length === 1){zeroes = '00000'}
                    if(data.data[0].UserPK_Patient.toString().length === 2){zeroes = '0000'}
                    if(data.data[0].UserPK_Patient.toString().length === 3){zeroes = '000'}
                    if(data.data[0].UserPK_Patient.toString().length === 4){zeroes = '00'}
                    if(data.data[0].UserPK_Patient.toString().length === 5){zeroes = '0'}
                    $scope.patient.ID_Patient = $filter('date')(new Date(),'yy') + zeroes + $scope.patient.UserPK_Patient;
                }else{
                    $scope.patient.UserPK_Patient = 1;
                    $scope.patient.ID_Patient = $filter('date')(new Date(),'yy') + '000001';
                }
            });
        };

        //for hospitalizations
        $scope.tempHospital = {};
        $scope.isChangedHospital = 0;
        $scope.hospChanged = function(){
            if($scope.tempHospital.Medicine_Prescription != '') {
                $scope.isChangedHospital = 1;
            }else {$scope.isChangedHospital = 0;}
        }
        $scope.addhospital = function(tempHospital){
            $scope.hospitals.push(tempHospital);
            $scope.tempHospital = {};
        };
        $scope.addpatient = function(){
            var patient = $scope.patient;

            if($stateParams.id){
                patient.SysPK_Patient = $stateParams.id;
                patientDataFactory.updatePatient(patient).then(function(){
                    if ($scope.filename != ''){
                        $scope.startUpload(0);
                    }
                    $location.path('/patients');
                });

                for(var i = 0; i < $scope.hospitals.length; i++){
                    $scope.hospitals[i].SysPK_Hospitalization = rfc4122.v4();
                    $scope.hospitals[i].SysFK_Patient_Hospitalization = patient.SysPK_Patient;
                    hospitalizationDataFactory.addHospitalization($scope.hospitals[i]).then(function () {});
                }
            }else{
                patient.SysPK_Patient = rfc4122.v4();
                patient.Picture_Patient = $scope.filename;
                patientDataFactory.addPatient(patient).then(function(){
                    if ($scope.filename != ''){
                        $scope.startUpload(0);
                    }
                    $location.path('/patients');
                });
                for(var i = 0; i < $scope.hospitals.length; i++){
                    $scope.hospitals[i].SysPK_Hospitalization = rfc4122.v4();
                    $scope.hospitals[i].SysFK_Patient_Hospitalization = patient.SysPK_Patient;
                    hospitalizationDataFactory.addHospitalization($scope.hospitals[i]).then(function () {});
                } //add hospitalizations
            }
        };
        $scope.updatepatient = function(){
            var patient = $scope.patient;
            patientDataFactory.updatepatient(patient).then(function(){
                $window.history.back();
            });
        };

        $scope.deletepatient = function(){
            if($scope.id !='') {
                $confirm({text: 'Are you sure you want to delete?', title: 'Confirm', ok: 'Yes', cancel: 'No'})
                    .then(function () {
                        patientDataFactory.deletePatient($scope.id).success(function () {
                            patientDataFactory.getPatients().then(function (data) {
                                $scope.patients = data.data;
                                $scope.id = '';
                                toastr.success('Patient successfully deleted.');
                            });
                        });
                    });
            }else{
                toastr.error('Please select patient to delete.');
            }

        };
        //image upload
        $scope.filename = '';
        $scope.dataUrls = '../assets/img/avatar_2xx.png'
        $scope.fileReaderSupported = window.FileReader != null;

        $scope.onFileSelect = function($files) {
            $scope.filename = $files[0].name;
            $scope.selectedFiles = [];
            if ($scope.upload && $scope.upload.length > 0) {
                for (var i = 0; i < $scope.upload.length; i++) {
                    if ($scope.upload[i] != null) {
                        $scope.upload[i].abort();
                    }
                }
            }
            $scope.upload = [];
            $scope.uploadResult = [];
            $scope.selectedFiles = $files;
            for ( var i = 0; i < $files.length; i++) {
                var $file = $files[i];
                if (window.FileReader && $file.type.indexOf('image') > -1) {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL($files[i]);
                    var loadFile = function(fileReader, index) {
                        fileReader.onload = function(e) {
                            $timeout(function() {
                                $scope.dataUrls = e.target.result;
                            });
                        }
                    }(fileReader, i);
                }
            }
        }
        $scope.startUpload = function(index) {
            $scope.upload[index] = $upload.upload({
                url : urlBase +'/upload',
                method: 'PUT',
                data : {
                    myModel : $scope.myModel
                },
                file: $scope.selectedFiles,
                fileFormDataName: 'myFile'
            })
                /* CALLBACK FUNCTIONS*/
                //Success with POST - file uploaded ok
                .success(function(data, status, headers,config) {
                    $scope.cbStatus = status;
                    $scope.cbData = data;
                    $scope.cbHeaders = header;
                    $scope.cbConfig = config;

                })
                //Error with POST
                .error(function(data, status, headers,config) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                })
                .then(function(response) { $scope.uploadResult.push(response.data);},
                null, function(evt) {})
                .xhr(function(xhr){ xhr.upload.addEventListener('abort', function(){console.log('aborted complete')}, false);});
        }
    }
]);

app.controller('PatientInfoController',['$scope', 'patientDataFactory', 'transactionDataFactory', '$location', '$window', '$filter','$stateParams','toastr',
    function($scope, patientDataFactory, transactionDataFactory, $location, $window, $filter, $stateParams, toastr){
        patientDataFactory.getPatient($stateParams.id).then(function(data) {
            $scope.patient = data.data[0];

            if($scope.patient !== undefined){
                $scope.hospitals = $scope.patient.hospitalizations;
                $scope.dataUrls = '../assets/img/' + $scope.patient.Picture_Patient;
                transactionDataFactory.getPatientTransactions($scope.patient.SysPK_Patient).then(function(data){
                    $scope.transactions = data;
                });
            }
            else{
                $scope.dataUrls = '../assets/img/avatar_2xx.png';
                toastr.error("No Record Found");
            }
        });
        $scope.updateTransaction = function(path){
            $location.path(path);
        };
    }
]);