/**
 * Created by kent on 8/31/2015.
 */
'use strict';

app.controller('patientEncounterListCtrl',['$scope', 'encounterDataFactory', 'patientDataFactory','doctorDataFactory','$location', '$window', '$filter','$stateParams','toastr', '$confirm','rfc4122','filterFilter','$modal','$log',
    function($scope, encounterDataFactory, patientDataFactory, doctorDataFactory, $location, $window, $filter, $stateParams, toastr, $confirm, rfc4122,filterFilter, $modal, $log){

        $scope.id ='';
        $scope.encounter = {};
        $scope.encounters = [];
        $scope.patient = {};
        $scope.patients = [];

        $scope.setID = function(encounter){
            $scope.id = encounter.SysPK_Encounter;

            if ($scope.lastSelected) {
                $scope.lastSelected.selected = '';
            }
            this.selected = 'active';
            $scope.lastSelected = this;
        }; //to id of the selected row

        $scope.gotoUpdate = function(path){
            if($scope.id !=''){
                console.log(path + $scope.id);
                $location.path(path + $scope.id);
            }else{
                toastr.error('Please select encounter to update.');
            }
        };

        encounterDataFactory.getEncounters().then(function(data){
            $scope.encounters = data;
            //$scope.encountersServed = $filter('filter')($scope.encounters.data, {IsServed_Encounter:1});
            //$scope.encountersNotServe = $filter('filter')($scope.encounters.data, {IsServed_Encounter:0});

            //pagination and search
            $scope.search = {};
            $scope.resetFilters = function () {
                // needs to be a function or it won't trigger a $watch
                $scope.search = {};
            }; //not yet used
            // pagination controls
            $scope.currentPage = 1;
            $scope.totalItems = $scope.encounters.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
            // $watch search to update pagination
            $scope.$watch('search', function (newVal, oldVal) {
                $scope.filtered = filterFilter($scope.encounters.data, newVal);
                $scope.totalItems = $scope.filtered.length;
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                $scope.currentPage = 1;
            }, true);

            //
            if($stateParams.id){
                $scope.id = $stateParams.id;
                var recordFound = 0;
                for(var i = 0; i < data.data.data.length; i++){
                    if(data.data.data[i].SysPK_Ecounter === $stateParams.id){
                        recordFound +=1;
                    }
                }
                if(recordFound > 0){
                    $scope.encounter = $filter('filter')(data.data.data, {SysPK_Encounter:$stateParams.id})[0];
                    console.log($scope.patients);
                    $scope.patient = $filter('filter')($scope.patients.data, {SysPK_Patient:$scope.encounter.SysFK_UMPatient_Encounter})[0];
                    console.log($scope.patient);
                    $scope.patientname = $scope.patient.Name_Patient;
                }else{
                    toastr.error('No record found.');
                }
            }
        });

        $scope.deleteencounter = function(){
            if($scope.id !='') {
                $confirm({text: 'Are you sure you want to delete?', title: 'Confirm', ok: 'Yes', cancel: 'No'})
                    .then(function () {
                        encounterDataFactory.deleteEncounter($scope.id).success(function () {
                            encounterDataFactory.getEncounters().then(function(data){
                                $scope.encounters = data;
                                $scope.id = '';
                                toastr.success('Encounter successfully deleted.');
                            });
                        });
                    });
            }else{
                toastr.error('Please select encounter to delete.');
            }
        };
    }
]); //done

app.controller('patientEncounterSetupController',['$scope', '$rootScope', 'encounterDataFactory', 'patientDataFactory','doctorDataFactory', 'newsfeedDataFactory',
    '$location', '$window', '$filter','$stateParams','toastr', '$confirm','rfc4122','filterFilter','$modal','$log',
    function($scope, $rootScope, encounterDataFactory, patientDataFactory, doctorDataFactory, newsfeedDataFactory,
             $location, $window, $filter, $stateParams, toastr, $confirm, rfc4122,filterFilter, $modal, $log){

        $scope.encounters = [];
        $scope.encounter = {};
        $scope.encounter.Date_Encounter = $filter('date')(new Date(),'yyyy-MM-dd');

        $scope.patients = [];
        $scope.doctors = [];
        $scope.patient = {};
        $scope.doctor = {};
        $scope.patientname = '';
        $scope.status;
        $scope.id = '';
        $scope.nameInput = '';
        
        //for modal patient list
        patientDataFactory.getPatients().then(function(data){
            $scope.patients = data.data;
            $scope.openpatient = function (size) {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'patientModal.html',
                    controller: 'PatientModalInstanceCtrl',
                    size: size,
                    resolve: {
                        patients: function () {
                            return $scope.patients;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    $scope.patientname = selectedItem.Name_Patient;
                    $scope.encounter.SysFK_UMPatient_Encounter = selectedItem.SysPK_Patient;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        });
        //for modal doctor list
        doctorDataFactory.getDoctors().then(function(data){
            $scope.doctors = data.data;
            $scope.opendoctor = function (size) {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'doctorModal.html',
                    controller: 'DoctorModalInstanceCtrl',
                    size: size,
                    resolve: {
                        doctors: function () {
                            return $scope.doctors;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    $scope.doctorname = selectedItem.Name_Doctor;
                    $scope.encounter.SysFK_UMDoctor_Encounter = selectedItem.SysPK_Doctor;
                    encounterDataFactory.getallEncountersByDoctor(selectedItem.SysPK_Doctor,$scope.encounter.Date_Encounter).then(function(data) {
                        $scope.encounter.PriorityNumber_Encounter = data.data.length + 1;
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        });

        $scope.addencounter = function(){
            if($stateParams.id){
                var encounter = $scope.encounter;
                encounterDataFactory.updateEncounter(encounter).then(function(){
                    $location.path("/encounters");
                });
            }else{
                var encounter = $scope.encounter;
                encounter.SysPK_Encounter = rfc4122.v4();
                encounterDataFactory.addEncounter(encounter).then(function(){
                    $location.path("/encounters");
                });

                var newsfeed = {
                    SysPK_Newsfeed : rfc4122.v4(),
                    SysFK_Patient_Newsfeed : $scope.encounter.SysFK_UMPatient_Encounter,
                    SysFK_Doctor_Newsfeed : $scope.encounter.SysFK_UMDoctor_Encounter,
                    SysFK_User_Newsfeed : $rootScope.user.syspk,
                    Module_Newsfeed : 'Encounter',
                    Particulars_Newsfeed : $scope.encounter.ReasonForEncounter_Encounter,
                    Date_Newsfeed : new Date()
                };
                newsfeedDataFactory.addNewsfeed(newsfeed).then(function(){});
            }
        };
}]);

