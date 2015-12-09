/**
 * Created by kent on 12/3/2015.
 */
'use strict';

app.controller('dashboardController',['$scope', '$rootScope', '$location', '$window', '$filter','$stateParams','toastr', '$confirm','rfc4122','filterFilter','$modal','$log',
    'departmentDataFactory', 'encounterDataFactory', 'transactionDataFactory', 'prescriptionDataFactory',
    'ledgerInvtyDataFactory', 'icdDataFactory', 'diagnoseDataFactory', 'requestDataFactory', 'newsfeedDataFactory',
    function($scope, $rootScope, $location, $window, $filter, $stateParams, toastr, $confirm, rfc4122,filterFilter, $modal, $log,
             departmentDataFactory, encounterDataFactory, transactionDataFactory, prescriptionDataFactory,
             ledgerInvtyDataFactory, icdDataFactory, diagnoseDataFactory, requestDataFactory, newsfeedDataFactory){

        $scope.dataUrls = '../assets/img/avatar_2xx.png'

        $scope.encounters = [];
        $scope.transaction = {};
        $scope.department = {};
        $scope.requestsDiagnostics = [];
        $scope.requestsProcedures = [];
        $scope.medicines = [];
        $scope.diagnoses = [];
        //surgery
        $scope.department.VisitCount_Department
        $scope.department.Masses_Surgery = '';
        $scope.department.Moles_Surgery = '';
        $scope.department.Pain_Surgery = '';
        $scope.department.Discharge_Surgery = '';
        $scope.department.HEENT_Surgery = '';
        $scope.department.Duration_Surgery = '';
        $scope.department.Severity_Surgery = '';
        $scope.selectedMasses = [];
        $scope.selectedMoles = [];
        $scope.selectedPain = [];
        $scope.selectedDischarge = [];
        $scope.selectedHEENT = [];
        $scope.selectedDuration = [];
        $scope.selectedSeverity = [];
        $scope.select1 = [{value: 'Head', label: 'Head'},
            {value: 'Neck', label: 'Neck'},
            {value: 'Breast', label: 'Breast'},
            {value: 'Abdominal', label: 'Abdominal'},
            {value: 'Inguinal', label: 'Inguinal'}
        ];
        $scope.select2 = [
            {value: 'Nipple', label: 'Nipple'},
            {value: 'Ears', label: 'Ears'},
            {value: 'Nose', label: 'Nose'},
            {value: 'Urithral', label: 'Urithral'},
            {value: 'Anal', label: 'Anal'},
            {value: 'Wound', label: 'Wound'}
        ];
        $scope.select3 = [
            {value: 'WNL(Within Normal Limits)', label: 'WNL(Within Normal Limits)'},
            {value: 'Scalp', label: 'Scalp'},
            {value: 'Neck', label: 'Neck'},
            {value: 'Face', label: 'Face'},
            {value: 'Ears', label: 'Ears'},
            {value: 'Nose', label: 'Nose'},
            {value: 'Others', label: 'Others'}
        ];
        $scope.selectDuration = [
            {value: 'Hours', label: 'Hours'},
            {value: 'Days', label: 'Days'},
            {value: 'Weeks', label: 'Weeks'}
        ];
        $scope.selectSeverity = [
            {value: 'Minor/Tolerable', label: 'Minor/Tolerable'},
            {value: 'Moderate', label: 'Moderate'},
            {value: 'Severe', label: 'Severe'}
        ];
        //medicine
        $scope.department.Symptoms_Medicine = '';
        $scope.department.PainLocation_Medicine = '';
        $scope.selectedSymptoms = [];
        $scope.selectedPainLocation = [];
        $scope.selectSymptoms = [
            {value: 'Fever', label: 'Fever'},
            {value: 'Cough', label: 'Cough'},
            {value: 'Coriza', label: 'Coriza'},
            {value: 'Pain', label: 'Pain'}
        ];
        $scope.selectPainLocation = [
            {value: 'Head', label: 'Head'},
            {value: 'Neck/Nape', label: 'Neck/Nape'},
            {value: 'Chest', label: 'Chest'},
            {value: 'Abdominal', label: 'Abdominal'},
            {value: 'Rectal', label: 'Rectal'},
            {value: 'Joints/Extremities', label: 'Joints/Extremities'}
        ];
        //ob-gyne
        $scope.selectedContraceptive = [];
        $scope.selectContraceptive = [
            {value: 'None', label: 'None'},
            {value: 'Pills', label: 'Pills'},
            {value: 'IUD', label: 'IUD'},
            {value: 'Rhythm', label: 'Rhythm'},
            {value: 'Condom', label: 'Condom'},
            {value: 'Nat. Family Planning', label: 'Nat. Family Planning'}
        ];
        $scope.selectedEducational = [];
        $scope.selectEducational = [
            {value: 'None', label: 'None'},
            {value: 'Primary', label: 'Primary'},
            {value: 'Secondary', label: 'Secondary'},
            {value: 'College', label: 'College'}
        ];
        $scope.selectedSocio = [];
        $scope.selectSocio = [
            {value: 'Dependent/Unemployed', label: 'Dependent/Unemployed'},
            {value: 'Employed(self,others)', label: 'Employed(self,others)'},
            {value: 'Casual Worker', label: 'Casual Worker'}
        ];
        $scope.selectedIncome = [];
        $scope.selectIncome = [
            {value: 'Below Minimum', label: 'Below Minimum'},
            {value: 'Minimum', label: 'Minimum'},
            {value: 'Above Minimum', label: 'Above Minimum'}
        ];

        $scope.status;
        $scope.items = [];
        $scope.item = {};
        $scope.icds = [];
        $scope.icd = {};
        $scope.diagnose = {};
        $scope.id = '';

        //load encounter data
        encounterDataFactory.getEncountersByDoctorNotServe($rootScope.user.sysfk, $filter('date')(new Date(),'yyyy-MM-dd')).then(function(data){
            $scope.encounters = data;
        }); //done

        //select patient in the queue
        $scope.patientToServe = false;
        $scope.encounter = {};
        $scope.patient = {};
        $scope.doctor = {};
        $scope.selectPatientToServe = function(encounter){
            if(!$stateParams.id) {
                $scope.patientToServe = true;
                $scope.encounter = $filter('filter')($scope.encounters.data, {SysPK_Encounter: encounter.SysPK_Encounter})[0];
                $scope.patient = $filter('filter')($scope.encounters.data, {SysPK_Encounter: encounter.SysPK_Encounter})[0].patient;
                $scope.doctor = $filter('filter')($scope.encounters.data, {SysPK_Encounter: encounter.SysPK_Encounter})[0].doctor;
                $scope.dataUrls = '../assets/img/' + $scope.patient.Picture_Patient;
                $scope.department.ReasonForEncounter_Department = $scope.encounter.ReasonForEncounter_Encounter;
                transactionDataFactory.getPatientTransactions($scope.patient.SysPK_Patient).then(function(data){
                    $scope.department.VisitCount_Department = data.data.length + 1;
                });
            }
        }; // done

        //adding diagnotics in the laboratory and diagnostics table
        $scope.tempDiag = {};
        $scope.isChangedDiag = 0;
        $scope.diagChanged = function(){
            if($scope.tempDiag.Particular_Request != '') {
                $scope.isChangedDiag = 1;
            }else {$scope.isChangedDiag = 0;}
        }
        $scope.addDiagnostics = function(tempDiag){
            $scope.requestsDiagnostics.push(tempDiag);
            $scope.tempDiag = {};
            $scope.isChangedDiag = 0
        };

        //adding procedures in the procedure table
        $scope.tempProced = {};
        $scope.isChangedProced = 0;
        $scope.procedChanged = function(){
            if($scope.tempProced.Particular_Request != '') {
                $scope.isChangedProced = 1;
            }else {$scope.isChangedProced = 0;}
        }
        $scope.addProcedures = function(tempProced){
            $scope.requestsProcedures.push(tempProced);
            $scope.tempProced = {};
            $scope.isChangedProced = 0
        };

        //adding medicine in the prescription table
        $scope.tempMed = {};
        $scope.isChangedMed = 0;
        $scope.medChanged = function(){
            if($scope.tempMed.Medicine_Prescription != '') {
                $scope.isChangedMed = 1;
            }else {$scope.isChangedMed = 0;}
        }
        $scope.addmedicine = function(tempMed){
            $scope.medicines.push(tempMed);
            $scope.tempMed = {};
            $scope.isChangedMed = 0;
        };

        //modal ICD10 //adding diagnoses
        icdDataFactory.getICDs().then(function(data){
            $scope.icds = data.data;
            $scope.openICD = function (size) {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'icd10Modal.html',
                    controller: 'ICD10ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        icds: function () {
                            return $scope.icds;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    $scope.tempICD = selectedItem;
                    $scope.addICD($scope.tempICD);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        });
        $scope.tempICD = {};
        $scope.addICD = function(tempICD){
            //
            $scope.diagnose.SysFK_ICD10_Diagnoses = tempICD.ICDCode_ICD;
            $scope.diagnose.Diagnoses_Diagnoses = tempICD.Description_ICD;

            $scope.diagnoses.push($scope.diagnose);
            $scope.diagnose = {};
            $scope.tempICD = {};
        };

        //to select format
        $scope.department.Module_Department = '';
        $scope.setFormat = function(format) {
            $scope.department.Module_Department = format;
        }; //done
        //to save record
         //done

        //load transactions
        if($stateParams.id){
            $scope.id = $stateParams.id;
            $scope.patientToServe = true;
            transactionDataFactory.getDepartmentTransactions($stateParams.id).then(function(data){
                $scope.transaction = data.data[0];
                if($scope.transaction !== undefined) {
                    $scope.department = $scope.transaction.department;
                    for(var i = 0; $scope.department.Masses_Surgery.split('|').length - 1 > i; i++){
                        $scope.selectedMasses.push($scope.department.Masses_Surgery.split('|')[i]);
                    }
                    for(var i = 0; $scope.department.Moles_Surgery.split('|').length - 1 > i; i++){
                        $scope.selectedMoles.push($scope.department.Moles_Surgery.split('|')[i]);
                    }
                    for(var i = 0; $scope.department.Pain_Surgery.split('|').length - 1 > i; i++){
                        $scope.selectedPain.push($scope.department.Pain_Surgery.split('|')[i]);
                    }
                    for(var i = 0; $scope.department.Discharge_Surgery.split('|').length - 1 > i; i++){
                        $scope.selectedDischarge.push($scope.department.Discharge_Surgery.split('|')[i]);
                    }
                    for(var i = 0; $scope.department.HEENT_Surgery.split('|').length - 1 > i; i++){
                        $scope.selectedHEENT.push($scope.department.HEENT_Surgery.split('|')[i]);
                    }
                    for(var i = 0; $scope.department.Duration_Surgery.split('|').length - 1 > i; i++){
                        $scope.selectedDuration.push($scope.department.Duration_Surgery.split('|')[i]);
                    }
                    for(var i = 0; $scope.department.Severity_Surgery.split('|').length - 1 > i; i++){
                        $scope.selectedSeverity.push($scope.department.Severity_Surgery.split('|')[i]);
                    }
                    $scope.patient = $scope.transaction.patient;
                    $scope.doctor = $scope.transaction.doctor;
                    $scope.diagnoses = $scope.transaction.diagnoses;
                    $scope.requestsDiagnostics = $filter('filter')($scope.transaction.requests, {Module_Request: 'Laboratory'});
                    $scope.requestsProcedures = $filter('filter')($scope.transaction.requests, {Module_Request: 'Procedures'});
                    $scope.medicines = $scope.transaction.prescriptions;
                    $scope.dataUrls = '../assets/img/' + $scope.patient.Picture_Patient;
                }
                else{
                    $scope.dataUrls = '../assets/img/avatar_2xx.png';
                    toastr.error("No Record Found");
                }
            });
        }
        else{
            $scope.transaction.Date_Trans = $filter('date')(new Date(),'yyyy-MM-dd');
            $scope.addTransaction = function(){
                console.log($scope.requestsDiagnostics);
                console.log($scope.requestsProcedures);
                if ($scope.patientToServe){
                    var recordSaved = 0;

                    var transaction = $scope.transaction;
                    transaction.SysPK_Trans = rfc4122.v4();
                    transaction.Module_TransH = $scope.department.Module_Department;
                    transaction.SysFK_Patient_Trans = $scope.patient.SysPK_Patient;
                    transaction.SysFK_Doctor_Trans = $scope.doctor.SysPK_Doctor;
                    //Add transaction
                    transactionDataFactory.addTransaction(transaction).then(function () {}); //done

                    var department = $scope.department;
                    department.SysPK_Department = rfc4122.v4();
                    department.SysFK_Trans_Department = transaction.SysPK_Trans;
                    department.Module_Department = $scope.department.Module_Department;
                    console.log($scope.selectedSymptoms);
                    if($scope.department.Module_Department === 'Medicines') {
                        for (var i = 0; $scope.selectedSymptoms.length > i; i++) {
                            department.Symptoms_Medicine += $scope.selectedSymptoms[i] + "|";
                        }
                        for (var i = 0; $scope.selectedPainLocation.length > i; i++) {
                            department.PainLocation_Medicine += $scope.selectedPainLocation[i] + "|";
                        }
                    }
                    if($scope.department.Module_Department === 'Surgery') {
                        for(var i = 0; $scope.selectedMasses.length > i; i++){
                            department.Masses_Surgery += $scope.selectedMasses[i] + "|";
                        }
                        for(var i = 0; $scope.selectedMoles.length > i; i++){
                            department.Moles_Surgery += $scope.selectedMoles[i] + "|";
                        }
                        for(var i = 0; $scope.selectedPain.length > i; i++){
                            department.Pain_Surgery += $scope.selectedPain[i] + "|";
                        }
                        for(var i = 0; $scope.selectedDischarge.length > i; i++){
                            department.Discharge_Surgery += $scope.selectedDischarge[i] + "|";
                        }
                        for(var i = 0; $scope.selectedHEENT.length > i; i++){
                            department.HEENT_Surgery += $scope.selectedHEENT[i] + "|";
                        }
                        for(var i = 0; $scope.selectedDuration.length > i; i++){
                            department.Duration_Surgery += $scope.selectedDuration[i] + "|";
                        }
                        for(var i = 0; $scope.selectedSeverity.length > i; i++){
                            department.Severity_Surgery += $scope.selectedSeverity[i] + "|";
                        }
                    }
                    ///add department
                    departmentDataFactory.addDepartment(department).then(function () {}); //done

                    for(var i = 0; i < $scope.requestsDiagnostics.length; i++){
                        $scope.requestsDiagnostics[i].SysPK_Request = rfc4122.v4();
                        $scope.requestsDiagnostics[i].Module_Request = 'Laboratory';
                        $scope.requestsDiagnostics[i].SysFK_Trans_Request = transaction.SysPK_Trans;
                        $scope.requestsDiagnostics[i].SysFK_Patient_Request = $scope.patient.SysPK_Patient;
                        requestDataFactory.addRequest($scope.requestsDiagnostics[i]).then(function () {});
                    } //add diagnostics
                    for(var i = 0; i < $scope.requestsProcedures.length; i++){
                        $scope.requestsProcedures[i].SysPK_Request = rfc4122.v4();
                        $scope.requestsProcedures[i].Module_Request = 'Procedures';
                        $scope.requestsProcedures[i].SysFK_Trans_Request = transaction.SysPK_Trans;
                        $scope.requestsProcedures[i].SysFK_Patient_Request = $scope.patient.SysPK_Patient;
                        requestDataFactory.addRequest($scope.requestsProcedures[i]).then(function () {});
                    } //add procedures
                    for(var i = 0; i < $scope.diagnoses.length; i++){
                        $scope.diagnoses[i].SysPK_Diagnoses = rfc4122.v4();
                        $scope.diagnoses[i].SysFK_Trans_Diagnoses = transaction.SysPK_Trans;
                        diagnoseDataFactory.addDiagnose($scope.diagnoses[i]).then(function () {});
                    } //add diagnoses
                    for(var i = 0; i < $scope.medicines.length; i++){
                        $scope.medicines[i].SysPK_Prescription = rfc4122.v4();
                        $scope.medicines[i].SysFK_Trans_Prescription = transaction.SysPK_Trans;
                        $scope.medicines[i].SysFK_Patient_Prescription =  $scope.patient.SysPK_Patient;
                        prescriptionDataFactory.addPrescription($scope.medicines[i]).then(function () {});
                    } //add add medicines

                    //update encounter
                    var isServed = {"SysPK_Encounter": $scope.encounter.SysPK_Encounter,
                        "IsServed_Encounter": 1}
                    encounterDataFactory.updateEncounter(isServed).then(function(){
                        encounterDataFactory.getEncountersByDoctorNotServe($rootScope.user.sysfk, $filter('date')(new Date(),'yyyy-MM-dd')).then(function(data){
                            $scope.encounters = data;
                        });
                    });
//Newsfeed
                    var newsfeed = {
                        SysPK_Newsfeed : rfc4122.v4(),
                        SysFK_Patient_Newsfeed : $scope.patient.SysPK_Patient,
                        SysFK_Doctor_Newsfeed : $scope.doctor.SysPK_Doctor,
                        SysFK_User_Newsfeed : $rootScope.user.syspk,
                        Module_Newsfeed : $scope.department.Module_Department,
                        Particulars_Newsfeed : $scope.department.Impression_Department,
                        Date_Newsfeed : new Date()
                    };
                    newsfeedDataFactory.addNewsfeed(newsfeed).then(function(){});

                    toastr.success("Transaction successfully saved!");
                    $scope.items = [];
                    $scope.diagnoses = [];
                    $scope.encounter = {};
                    $scope.medicines = [];
                    $scope.patient = {};
                    $scope.department = {};
                    $scope.selectedMasses = [];
                    $scope.selectedMoles = [];
                    $scope.selectedPain = [];
                    $scope.selectedDischarge = [];
                    $scope.selectedHEENT = [];
                    $scope.selectedDuration = [];
                    $scope.selectedSeverity = [];
                    $scope.diagnoses = [];
                    $scope.requestsDiagnostics = [];
                    $scope.requestsProcedures = [];
                    $scope.dataUrls = '../assets/img/avatar_2xx.png'
                }else{ toastr.error('Please Select Patient in the queue');}
            };
        }


        //set item to edit or delete
        $scope.setItemToEdit = function(item){
            $scope.tempItem = item;
        };


        $scope.valueChanged = function(index){
            $scope.items[index].DisplaySubTotalIn_LdgrInvty = $scope.items[index].DisplayQtyOut_LdgrInvty * $scope.items[index].DisplayUnitSelling_LdgrInvty;
        };


        //next tab --not yet done
        $scope.activeTab = function(tabname){
            var active = 'active';
            return active;
        }
    }]);


