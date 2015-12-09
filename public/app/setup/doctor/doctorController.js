/**
 * Created by kent on 8/31/2015.
 */
'use strict';

app.controller('DoctorListCtrl',['$scope', 'doctorDataFactory', '$location','toastr','filterFilter','$confirm',
    function($scope, doctorDataFactory, $location, toastr ,filterFilter,$confirm){
        $scope.doctors = [];
        $scope.id = '';
        doctorDataFactory.getDoctors().then(function(data) {
            $scope.doctors = data.data;
            //pagination and search
            $scope.search = {};
            $scope.resetFilters = function () {
                // needs to be a function or it won't trigger a $watch
                $scope.search = {};
            };
            // pagination controls
            $scope.currentPage = 1;
            $scope.totalItems = $scope.doctors.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
            // $watch search to update pagination
            $scope.$watch('search', function (newVal, oldVal) {
                $scope.filtered = filterFilter($scope.doctors.data, newVal);
                $scope.totalItems = $scope.filtered.length;
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                $scope.currentPage = 1;
            }, true);
        });

        $scope.setID = function(doctor){
            $scope.id = doctor.SysPK_Doctor;

            if ($scope.lastSelected) {
                $scope.lastSelected.selected = '';
            }
            this.selected = 'active';
            $scope.lastSelected = this;
        };
        $scope.deletedoctor = function(){
            if($scope.id !='') {
                $confirm({text: 'Are you sure you want to delete?', title: 'Confirm', ok: 'Yes', cancel: 'No'})
                    .then(function () {
                        doctorDataFactory.deleteDoctor($scope.id).success(function () {
                            doctorDataFactory.getDoctors().then(function (data) {
                                $scope.doctors = data.data;
                                $scope.id = '';
                                toastr.success('Doctor successfully deleted.');
                            });
                        });
                    });
            }else{
                toastr.error('Please select doctor to delete.');
            }

        };
        $scope.gotoUpdate = function(path){
            if($scope.id !=''){
                console.log(path + $scope.id);
                $location.path(path + $scope.id);
            }else{
                toastr.error('Please select doctor to update.');
            }
        };
    }
]);

app.controller('DoctorSetupCtrl',['$scope', 'doctorDataFactory', 'transactionDataFactory', 'hospitalizationDataFactory', '$location', '$window', '$filter','$stateParams','toastr', '$confirm','rfc4122','filterFilter','$timeout','$upload',
    function($scope, doctorDataFactory, transactionDataFactory, hospitalizationDataFactory, $location, $window, $filter, $stateParams, toastr, $confirm, rfc4122,filterFilter, $timeout, $upload){
        $scope.doctor = {};
        $scope.dataUrls = '../assets/img/avatar_2xx.png';
        if($stateParams.id){
            doctorDataFactory.getDoctor($stateParams.id).then(function(data) {
                $scope.doctor = data.data[0];
                if($scope.doctor !== undefined){
                    $scope.dataUrls = '../assets/img/' + $scope.doctor.Picture_Doctor;
                }
                else{
                    toastr.error("No Record Found");
                    $location.path('/doctors');
                }
            });
        }
        else{
            doctorDataFactory.getLastDoctorID().then(function(data){
                if(data.data.length !== 0) {
                    $scope.doctor.UserPK_Doctor = data.data[0].UserPK_Doctor + 1;
                    var zeroes = '';
                    if(data.data[0].UserPK_Doctor.toString().length === 1){zeroes = '90000'}
                    if(data.data[0].UserPK_Doctor.toString().length === 2){zeroes = '9000'}
                    if(data.data[0].UserPK_Doctor.toString().length === 3){zeroes = '9000'}
                    if(data.data[0].UserPK_Doctor.toString().length === 4){zeroes = '90'}
                    if(data.data[0].UserPK_Doctor.toString().length === 5){zeroes = '9'}
                    $scope.doctor.UserPK_Doctor = $filter('date')(new Date(),'yy') + zeroes + $scope.doctor.UserPK_Doctor;
                }else{
                    $scope.doctor.UserPK_Doctor = 1;
                    $scope.doctor.IDNumber_Doctor = $filter('date')(new Date(),'yy') + '900001';
                }
            });
        };
        $scope.adddoctor = function(){
            var doctor = $scope.doctor;

            if($stateParams.id){
                doctor.SysPK_Doctor = $stateParams.id;
                doctorDataFactory.updateDoctor(doctor).then(function(){
                    if ($scope.filename != ''){
                        $scope.startUpload(0);
                    }
                    $location.path('/doctors');
                });
            }else{
                doctor.SysPK_Doctor = rfc4122.v4();
                doctor.Picture_Doctor = $scope.filename;
                doctorDataFactory.addDoctor(doctor).then(function(){
                    if ($scope.filename != ''){
                        $scope.startUpload(0);
                    }
                    $location.path('/doctors');
                });
            }
        };
        $scope.updatedoctor = function(){
            var doctor = $scope.doctor;
            doctorDataFactory.updatedoctor(doctor).then(function(){
                $window.history.back();
            });
        };

        $scope.deletedoctor = function(){
            if($stateParams.id !='') {
                $confirm({text: 'Are you sure you want to delete?', title: 'Confirm', ok: 'Yes', cancel: 'No'})
                    .then(function () {
                        doctorDataFactory.deleteDoctor($scope.id).success(function () {
                            doctorDataFactory.getDoctors().then(function (data) {
                                $scope.doctors = data.data;
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
                url : 'http://' + urlbase +'/upload',
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


