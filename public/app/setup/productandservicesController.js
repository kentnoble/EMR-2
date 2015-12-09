/**
 * Created by kent on 8/31/2015.
 */
'use strict';

app.controller('productandservicesController',
    function productandservicesController($scope) {
        $scope.productsandservices = [
            {productcode: '0001', description: 'Plaster', category: 'Plaster', subcategory: 'First Aid', type: 'adadwadw'},
            {productcode: '0001', description: 'Plaster', category: 'Plaster', subcategory: 'First Aid', type: 'adadwadw'},
            {productcode: '0001', description: 'Plaster', category: 'Plaster', subcategory: 'First Aid', type: 'adadwadw'}
        ];
    }
);

