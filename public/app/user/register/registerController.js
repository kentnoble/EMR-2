/**
 * Created by kent on 12/1/2015.
 */

'use strict';

app.controller('RegisterCtrl', ['$scope', '$location', 'toastr', '$modal', '$log', '$filter', '$stateParams', 'userDataFactory', 'patientDataFactory', 'doctorDataFactory', 'rfc4122',
    function($scope, $location, toastr, $modal, $log, $filter, $stateParams, userDataFactory, patientDataFactory, doctorDataFactory, rfc4122) {
        $scope.user = {};
        $scope.userList = [];
        $scope.register = function() {
            var user = $scope.user;
            if($stateParams.id){
                user.SysPK_User = $stateParams.id;
                patientDataFactory.updatePatient(user).then(function(){
                    //$location.path('/patients');
                });
            }else{
                if(isAvailableUsername(user.UserName_User)){
                    user.SysPK_User = rfc4122.v4();
                    userDataFactory.addUser(user).then(function(){
                        $scope.userList.push(user.UserName_User);
                        toastr.success("User " + user.UserName_User + " is succesfully added to EMR database.");
                        $scope.user = {};
                    });
                }
            }
        }

        userDataFactory.getUsers().then(function(user) {
            for(var i = 0; i < user.data.data.length; i++){
                console.log(user.data.data[i].UserName_User);
                $scope.userList.push(user.data.data[i].UserName_User);
            }

            console.log("userList :" + $scope.userList);
        });

        function isAvailableUsername(username){
            if($filter('filter')($scope.userList, username).length ===0){
                return true;
            }else{
                toastr.info('Username is already taken. Please pick another one.');
                return false;
            }
        }

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
                    $scope.user.Name_User = selectedItem.Name_Patient;
                    $scope.user.SysFK_User_User = selectedItem.SysPK_Patient;
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
                    $scope.user.Name_User = selectedItem.Name_Doctor;
                    $scope.user.SysFK_User_User = selectedItem.SysPK_Doctor;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        });

}]);
