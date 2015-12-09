/**
 * Created by kent on 10/22/2015.
 */

app.directive('accesssoftTable', function () {

    var controller = ['$scope', function ($scope) {

        }],
        template = '<table class="table table-condensed">' +
            '<form role="form">' +
                '<tr>' +
                '<th style="width: 250px" >Item</th>' +
                '<th>Qty</th>' +
                '<th>Unit</th>' +
                '<th>Cost</th>' +
                '<th>Selling Price</th>' +
                '<th>Sub Total</th>' +
                '</tr>' +
                '<tr ng-repeat="item in items" ng-click="setItemToEdit(item)">' +
                '<td class="no-padding"><input class="form-control input-sm" style="width: 250px" ng-model="item.DisplayDescription_LdgrInvty"></td>' +
                '<td class="no-padding"><input class="form-control input-sm" ng-model="item.DisplayQtyOut_LdgrInvty"></td>' +
                '<td class="no-padding"><input class="form-control input-sm" ng-model="item.DisplayUnitOfMeasure_LdgrInvty"></td>' +
                '<td class="no-padding"><input class="form-control input-sm" ng-model="item.DisplayUnitCOst_LdgrInvty"></td>' +
                '<td class="no-padding"><input class="form-control input-sm" ng-model="item.DisplayUnitSelling_LdgrInvty"></td>' +
                '<td class="no-padding"><input class="form-control input-sm" ng-model="item.DisplaySubTotalIn_LdgrInvty"></td>' +
                '</tr>' +
                '</form>' +
                '</table>';
    return {
        restrict: 'EA', //Default in 1.3+
        scope: {

            datasource: '=',
            add: '&'
        },
        controller: controller,
        template: template
    };
});
