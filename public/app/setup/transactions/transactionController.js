/**
 * Created by kent on 10/18/2015.
 */

'use strict';

app.controller('surgeryController',['$scope', 'surgeryDataFactory', 'encounterDataFactory','$location', '$window', '$filter','$routeParams','toastr', '$confirm','rfc4122','filterFilter','$modal','$log',
    function($scope, surgeryDataFactory, encounterDataFactory, $location, $window, $filter, $routeParams, toastr, $confirm, rfc4122,filterFilter, $modal, $log){
        //modals
        $scope.stateChanged = function (qId) {
            toastr.success("good");
            if($scope.answers[qId]){ //If it is checked
                alert('test');
            }else{
                alert('fail');
            }
        }
    }]);