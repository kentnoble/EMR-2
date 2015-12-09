/**
 * Created by kent on 8/31/2015.
 */

'use strict';

app.controller('obgyneController',['$scope', '$location', '$window', '$filter','$routeParams','toastr', '$confirm','rfc4122','filterFilter','$modal','$log',
    'surgeryDataFactory', 'encounterDataFactory', 'transactionDataFactory', 'inventoryDataFactory', 'prescriptionDataFactory',
    'ledgerInvtyDataFactory', 'departmentjunctionDataFactory', 'icdDataFactory', 'diagnoseDataFactory', 'requestDataFactory',
    function($scope, $location, $window, $filter, $routeParams, toastr, $confirm, rfc4122,filterFilter, $modal, $log,
             surgeryDataFactory, encounterDataFactory, transactionDataFactory, inventoryDataFactory, prescriptionDataFactory,
             ledgerInvtyDataFactory, departmentjunctionDataFactory, icdDataFactory, diagnoseDataFactory, requestDataFactory){

        $scope.dataUrls = '../assets/img/avatar_2xx.png'

        $scope.encounters = [];
        $scope.encounter = {};
        $scope.patientToServe = false;
        $scope.transaction = {};
        $scope.transaction.Date_Trans = $filter('date')(new Date(),'yyyy-MM-dd');
        $scope.department = {};
        $scope.departmentjunctions = {};
        $scope.patient = {};
        $scope.doctor = {};
        $scope.diagnoses = [];
        $scope.requestsDiagnostics = [];
        $scope.requestsProcedures = [];

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

        $scope.transactions = [];
        $scope.surgeries = [];
        $scope.patients = [];
        $scope.doctors = [];
        $scope.inventories = [];
        $scope.inventory = {};
        $scope.status;
        $scope.medicines = [];
        $scope.items = [];
        $scope.item = {};
        $scope.icds = [];
        $scope.icd = {};
        $scope.diagnose = {};
        $scope.id = '';

        //load encounter data
        encounterDataFactory.getEncountersServed(0).then(function(data){
            $scope.encounters = data;
        }); //done
        $scope.selectPatientToServe = function(encounter){
            if(!$routeParams.id) {
                $scope.patientToServe = true;
                $scope.encounter = $filter('filter')($scope.encounters.data, {SysPK_Encounter: encounter.SysPK_Encounter})[0];
                $scope.patient = $filter('filter')($scope.encounters.data, {SysPK_Encounter: encounter.SysPK_Encounter})[0].patient;
                $scope.doctor = $filter('filter')($scope.encounters.data, {SysPK_Encounter: encounter.SysPK_Encounter})[0].doctor;
                console.log($scope.patient);
                $scope.dataUrls = '../assets/img/' + $scope.patient.Picture_Patient;
            }
        }; //

        //load transactions Surgeries
        if($routeParams.id){
            $scope.id = $routeParams.id;
            surgeryDataFactory.getSurgery($routeParams.id).then(function(data){
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
                    $scope.departmentjunctions = $scope.transaction.departmentjunction;
                    $scope.diagnoses = $scope.transaction.diagnoses;
                    $scope.requestsDiagnostics = $filter('filter')($scope.transaction.requests.data, {Module_Request: 'Diagnostics'});
                    $scope.requestsProcedures = $filter('filter')($scope.transaction.requests.data, {Module_Request: 'Procedures'});
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
            //getAllSurgeries
        }

        $scope.addTransaction = function(){
            if ($scope.patientToServe) {
                var recordSaved = 0;
                var transaction = $scope.transaction;
                transaction.SysPK_Trans = rfc4122.v4();
                transaction.Module_TransH = 'surgery';
                transaction.SysFK_Patient_Trans = $scope.patient.SysPK_Patient;
                transaction.SysFK_Doctor_Trans = $scope.doctor.SysPK_Doctor;

                var surgery = $scope.department;
                surgery.SysPK_Surgery = rfc4122.v4();
                surgery.SysFK_Trans_Surgery = transaction.SysPK_Trans;

                var department = $scope.departmentjunctions;
                department.SysPK_Department = rfc4122.v4();
                department.SysFK_Trans_Department = transaction.SysPK_Trans;
                department.SysFK_Dept_Department = surgery.SysPK_Surgery;
                department.Module_Department = 'surgery';
                department.Particulars_Department = surgery.Impression_Surgery;

                for(var i = 0; $scope.selectedMasses.length > i; i++){
                    surgery.Masses_Surgery += $scope.selectedMasses[i] + "|";
                }
                for(var i = 0; $scope.selectedMoles.length > i; i++){
                    surgery.Moles_Surgery += $scope.selectedMoles[i] + "|";
                }
                for(var i = 0; $scope.selectedPain.length > i; i++){
                    surgery.Pain_Surgery += $scope.selectedPain[i] + "|";
                }
                for(var i = 0; $scope.selectedDischarge.length > i; i++){
                    surgery.Discharge_Surgery += $scope.selectedDischarge[i] + "|";
                }
                for(var i = 0; $scope.selectedHEENT.length > i; i++){
                    surgery.HEENT_Surgery += $scope.selectedHEENT[i] + "|";
                }
                for(var i = 0; $scope.selectedDuration.length > i; i++){
                    surgery.Duration_Surgery += $scope.selectedDuration[i] + "|";
                }
                for(var i = 0; $scope.selectedSeverity.length > i; i++){
                    surgery.Severity_Surgery += $scope.selectedSeverity[i] + "|";
                }

                transactionDataFactory.addTransaction(transaction).then(function () {});
                surgeryDataFactory.addSurgery(surgery).then(function () {});
                departmentjunctionDataFactory.addDepartmentJunction(department).then(function () {});
                for(var i = 0; i < $scope.items.length; i++){
                    $scope.items[i].SysPK_LdgrInvty = rfc4122.v4();
                    $scope.items[i].SysFK_Trans_LdgrInvty = transaction.SysPK_Trans;
                    ledgerInvtyDataFactory.addLedgerInvty($scope.items[i]).then(function () {});
                } //add items
                for(var i = 0; i < $scope.requestsDiagnostics.length; i++){
                    $scope.requestsDiagnostics[i].SysPK_Request = rfc4122.v4();
                    $scope.requestsDiagnostics[i].Module_Request = 'Laboratory and Diagnostics';
                    $scope.requestsDiagnostics[i].SysFK_Trans_Request = transaction.SysPK_Trans;
                    $scope.requestsDiagnostics[i].SysFK_Patient_Request = $scope.patient.SysPK_Patient;
                    requestDataFactory.addRequest($scope.requestsDiagnostics[i]).then(function () {});
                } //add diagnostics
                for(var i = 0; i < $scope.requestsProcedures.length; i++){
                    $scope.requestsProcedures[i].SysPK_Request = rfc4122.v4();
                    $scope.requestsDiagnostics[i].Module_Request = 'Procedures';
                    $scope.requestsProcedures[i].SysFK_Trans_Request = transaction.SysPK_Trans;
                    $scope.requestsProcedures[i].SysFK_Patient_Request = $scope.patient.SysPK_Patient;
                    requestDataFactory.addRequest($scope.requestsProcedures[i]).then(function () {});
                } //add procedures
                for(var i = 0; i < $scope.diagnoses.length; i++){
                    $scope.diagnoses[i].SysPK_Diagnoses = rfc4122.v4();
                    $scope.diagnoses[i].SysFK_Trans_Diagnoses = transaction.SysPK_Trans;
                    diagnoseDataFactory.addDiagnose($scope.diagnoses[i]).then(function () {});
                } //add diagnoses

                //update encounter
                var isServed = {"SysPK_Encounter": $scope.encounter.SysPK_Encounter,
                    "IsServed_Encounter": 1}
                encounterDataFactory.updateEncounter(isServed).then(function(){
                    encounterDataFactory.getEncountersServed(0).then(function(data){
                        $scope.encounters = data;
                    });
                });

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
        }; //done

        $scope.deletevisit = function(){
            if($scope.id !='') {
                $confirm({text: 'Are you sure you want to delete?', title: 'Confirm', ok: 'Yes', cancel: 'No'})
                    .then(function () {
                        visitDataFactory.deleteEncounter($scope.id).success(function () {
                            visitDataFactory.getEncounters().then(function (data) {
                                $scope.visits = data.data;
                                $scope.id = '';
                                toastr.success('Visit successfully deleted.');
                            });
                        });
                    });
            }else{
                toastr.error('Please select visit to delete.');
            }

        };


        //for medicine modal
        $scope.openmedicine = function (size) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'medicineSetupModal.html',
                controller: 'MedicineModalInstanceCtrl',
                size: size
            });
            modalInstance.result.then(function (medicine) {
                $scope.medicines.push(medicine);
                console.log($scope.medicines);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }; //not in use

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

        //for item modal - accounting
        $scope.QTY = 0;
        $scope.SubTotal = 0;
        $scope.tempItem = {};
        $scope.isChangedItem = 0;
        $scope.itemChanged = function(){
            if($scope.tempMed.Medicine_Prescription != '') {
                $scope.isChangedItem = 1;
            }else {$scope.isChangedItem = 0;}
        }
        $scope.additem = function(tempItem){
            //
            $scope.item.SysFK_Invty_LdgrInvty = tempItem.SysPK_Invty;
            $scope.item.DisplayQtyOut_LdgrInvty = $scope.QTY;
            $scope.item.DisplayDescription_LdgrInvty = tempItem.Description_Invty;
            $scope.item.DisplayUnitOfMeasure_LdgrInvty = tempItem.BaseUnitOfMeasure_Invty;
            $scope.item.DisplayUnitCOst_LdgrInvty = tempItem.CurrentCost_Invty > 0 ? tempItem.CurrentCost_Invty : 0;
            $scope.item.DisplayUnitSelling_LdgrInvty = tempItem.Price_Invty;
            $scope.item.DisplaySubTotalIn_LdgrInvty = $scope.item.DisplayUnitSelling_LdgrInvty * $scope.item.DisplayQtyOut_LdgrInvty;

            $scope.items.push($scope.item);
            $scope.tempItem = {};
            $scope.item = {};
            $scope.QTY = 0;
            $scope.SubTotal = 0;
            $scope.iftrue = 0;
        };

        //set item to edit or delete
        $scope.setItemToEdit = function(item){
            $scope.tempItem = item;
        };

        //modal items
        inventoryDataFactory.getInventories().then(function(data){
            $scope.inventories = data.data;
            $scope.openitem = function (size) {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'itemModal.html',
                    controller: 'ItemModalInstanceCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            return $scope.inventories;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    $scope.tempItem = selectedItem;
                    $scope.isChangedItem = 1;
                    $scope.QTY = 1;
                    $scope.SubTotal = selectedItem.Price_Invty;
                    $scope.additem($scope.tempItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        })

        //modal ICD10
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
                    console.log(selectedItem);
                    $scope.addICD($scope.tempICD);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        });
        $scope.tempICD = {};
        $scope.addICD = function(tempICD){
            //
            console.log(tempICD);
            $scope.diagnose.SysFK_ICD10_Diagnoses = tempICD.ICDCode_ICD;
            $scope.diagnose.Diagnoses_Diagnoses = tempICD.Description_ICD;

            $scope.diagnoses.push($scope.diagnose);
            $scope.diagnose = {};
            $scope.tempICD = {};
        };

        $scope.valueChanged = function(index){
            $scope.items[index].DisplaySubTotalIn_LdgrInvty = $scope.items[index].DisplayQtyOut_LdgrInvty * $scope.items[index].DisplayUnitSelling_LdgrInvty;
        };
    }]);



