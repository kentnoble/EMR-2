/**
 * Created by kent on 10/24/2015.
 */
app.controller('ICD10ModalInstanceCtrl', function ($scope, $modalInstance, icds,filterFilter) {

    $scope.icds = icds;
    $scope.icd = {};
    $scope.id = '';
    //pagination and search
    $scope.search = {};
    $scope.resetFilters = function () {
        // needs to be a function or it won't trigger a $watch
        $scope.search = {};
    };
    $scope.setID = function(icd)
    {
        $scope.id = icd.ICDCode_ICD;

        if ($scope.lastSelected) {
            $scope.lastSelected.selected = '';
        }
        this.selected = 'active';
        $scope.lastSelected = this;
    };
    // pagination controls
    $scope.currentPage = 1;
    $scope.totalItems = $scope.icds.length;
    $scope.entryLimit = 9; // items per page
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
    // $watch search to update pagination
    $scope.$watch('search', function (newVal, oldVal) {
        $scope.filtered = filterFilter($scope.icds.data, newVal);
        $scope.totalItems = $scope.filtered.length;
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        $scope.currentPage = 1;
    }, true);

    $scope.selected = {
        icd: $scope.icds[0]
    };

    $scope.ok = function (icds) {
        $scope.selected.icd = icds;
        $modalInstance.close($scope.selected.icd);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});