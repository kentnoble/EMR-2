/**
 * Created by kent on 10/20/2015.
 */

app.controller('MedicineModalInstanceCtrl', function ($scope, $modalInstance,filterFilter) {

    $scope.medicine = {};

    $scope.ok = function (medicine) {
        $modalInstance.close($scope.medicine);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});