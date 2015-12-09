/**
 * Created by kent on 8/31/2015.
 */
'use strict';

app.controller('genjournalController',
    function genjournalController($scope) {
        $scope.genjournals = [
            {name: 'Kent Roger V. Noble', age: '26', address: 'Fatima, Cebu City', occupation: 'Programmer'},
            {name: 'Mark Anthony Maloy', age: '34', address: 'Cebu City', occupation: 'Project Leader'},
            {name: 'Juan dela Cruz', age: '33', address: 'Talamban, Cebu City', occupation: 'Web Developer'}
        ];
    }
);


