/**
 * Created by kent on 10/9/2015.
 */

app.controller('DoctorModalInstanceCtrl', function ($scope, $modalInstance, doctors,filterFilter) {

    $scope.doctors = doctors;
    $scope.doctor = {};
    $scope.id = '';
    //pagination and search
    $scope.search = {};
    $scope.resetFilters = function () {
        // needs to be a function or it won't trigger a $watch
        $scope.search = {};
    };
    $scope.setID = function(doctor)
    {
        $scope.id = doctor.SysPK_Doctor;

        if ($scope.lastSelected) {
            $scope.lastSelected.selected = '';
        }
        this.selected = 'active';
        $scope.lastSelected = this;
    };
    // pagination controls
    $scope.currentPage = 1;
    $scope.totalItems = $scope.doctors.length;
    $scope.entryLimit = 9; // items per page
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
    // $watch search to update pagination
    $scope.$watch('search', function (newVal, oldVal) {
        $scope.filtered = filterFilter($scope.doctors.data, newVal);
        $scope.totalItems = $scope.filtered.length;
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        $scope.currentPage = 1;
    }, true);

    $scope.selected = {
        item: $scope.doctors[0]
    };

    $scope.ok = function (doctor) {
        $scope.selected.item = doctor;
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});