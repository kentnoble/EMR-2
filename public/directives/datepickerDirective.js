/**
 * Created by kent on 10/7/2015.
 */

app.directive('accesssoftDatepicker', function () {

    var controller = ['$scope', function ($scope) {
            $scope.today = function() {
                $scope.dt = new Date();
                $scope.ngmodel = $scope.model;
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };

            // Disable weekend selection
            $scope.disabled = function(date, mode) {
                //return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            $scope.toggleMin = function() {
                //$scope.minDate = $scope.minDate ? null : new Date();
            };
            $scope.toggleMin();
            $scope.maxDate = new Date(2020, 5, 22);

            $scope.open = function($event) {
                $scope.status.opened = true;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.formats = ['yyyy-MMM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];

            $scope.status = {
                opened: false
            };

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 2);
            $scope.events =
                [
                    {
                        date: tomorrow,
                        status: 'full'
                    },
                    {
                        date: afterTomorrow,
                        status: 'partially'
                    }
                ];

            $scope.getDayClass = function(date, mode) {
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0,0,0,0);

                    for (var i=0;i<$scope.events.length;i++){
                        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                        if (dayToCheck === currentDay) {
                            return $scope.events[i].status;
                        }
                    }
                }
                return '';
            };
        }],
        template = '<div>' +
                        '<input type="text"  ng-click="open($event)" class="form-control input-sm" ' +
                        'datepicker-popup="{{format}}" ng-model="ngmodel" is-open="status.opened" min-date="minDate" ' +
                        'max-date="maxDate" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ' +
                        'ng-required="true" close-text="Close" />' +
                    '</div>';
    return {
        restrict: 'EA', //Default in 1.3+
        scope: {
            datasource: '=',
            add: '&',
            model: '@'
        },
        controller: controller,
        template: template
    };
});
