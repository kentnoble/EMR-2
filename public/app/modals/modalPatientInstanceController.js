/**
 * Created by kent on 10/7/2015.
 */

app.controller('PatientModalInstanceCtrl', function ($scope, $modalInstance, patients,filterFilter) {

    $scope.patients = patients;
    $scope.patient = {};
    $scope.id = '';
    //pagination and search
    $scope.search = {};
    $scope.resetFilters = function () {
        // needs to be a function or it won't trigger a $watch
        $scope.search = {};
    };
    $scope.setID = function(patient)
    {
        $scope.id = patient.SysPK_Patient;

        if ($scope.lastSelected) {
            $scope.lastSelected.selected = '';
        }
        this.selected = 'active';
        $scope.lastSelected = this;
    };
    // pagination controls
    $scope.currentPage = 1;
    $scope.totalItems = $scope.patients.length;
    $scope.entryLimit = 9; // items per page
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
    // $watch search to update pagination
    $scope.$watch('search', function (newVal, oldVal) {
        $scope.filtered = filterFilter($scope.patients.data, newVal);
        $scope.totalItems = $scope.filtered.length;
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        $scope.currentPage = 1;
    }, true);

    $scope.selected = {
        item: $scope.patients[0]
    };

    $scope.ok = function (patient) {
        $scope.selected.item = patient;
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});