/**
 * Created by kent on 10/21/2015.
 */

app.controller('ItemModalInstanceCtrl', function ($scope, $modalInstance, items,filterFilter) {

    $scope.items = items;
    $scope.item = {};
    $scope.id = '';
    //pagination and search
    $scope.search = {};
    $scope.resetFilters = function () {
        // needs to be a function or it won't trigger a $watch
        $scope.search = {};
    };
    $scope.setID = function(item)
    {
        $scope.id = item.SysPK_Invty;

        if ($scope.lastSelected) {
            $scope.lastSelected.selected = '';
        }
        this.selected = 'active';
        $scope.lastSelected = this;
    };
    // pagination controls
    $scope.currentPage = 1;
    $scope.totalItems = $scope.items.length;
    $scope.entryLimit = 9; // items per page
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
    // $watch search to update pagination
    $scope.$watch('search', function (newVal, oldVal) {
        $scope.filtered = filterFilter($scope.items.data, newVal);
        $scope.totalItems = $scope.filtered.length;
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        $scope.currentPage = 1;
    }, true);

    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function (items) {
        $scope.selected.item = items;
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});