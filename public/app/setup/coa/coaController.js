/**
 * Created by kent on 10/20/2015.
 */

'use strict';

app.controller('coaController',['$scope', 'coaDataFactory', 'coatypeDataFactory', '$location', '$window', '$filter','$routeParams','toastr', '$confirm','rfc4122','filterFilter','$timeout','$upload',
    function($scope, coaDataFactory, coatypeDataFactory, $location, $window, $filter, $routeParams, toastr, $confirm, rfc4122,filterFilter, $timeout, $upload){

        console.log('Inside the controller');
        $scope.coas = [];
        $scope.coa = {};
        $scope.coatype = [];
        $scope.coatypes = {};
        $scope.status;
        $scope.id = '';

        $scope.gotoUpdate = function(path){
            if($scope.id !=''){
                console.log(path + $scope.id);
                $location.path(path + $scope.id);
            }else{
                toastr.error('Please select coa to update.');
            }
        }

        coaDataFactory.getCOAs('').then(function(data){
            $scope.coas = data;
            console.log($scope.coas);

            //pagination and search
            $scope.search = {};
            $scope.resetFilters = function () {
                // needs to be a function or it won't trigger a $watch
                $scope.search = {};
            };
            // pagination controls
            $scope.currentPage = 1;
            $scope.totalItems = $scope.coas.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 3;//Math.ceil($scope.totalItems / $scope.entryLimit);
            // $watch search to update pagination
            $scope.$watch('search', function (newVal, oldVal) {
                $scope.filtered = filterFilter($scope.coas.data, newVal);
                $scope.totalItems = $scope.filtered.length;
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                $scope.currentPage = 1;
            }, true);

            //
            if($routeParams.id){
                $scope.id = $routeParams.id;
                var recordFound = 0;

                console.log(data.data.data);
                for(var i = 0; i < data.data.data.length; i++){
                    if(data.data.data[i].SysPK_COA === $routeParams.id){
                        recordFound +=1;
                    }
                }
                if(recordFound > 0){
                    $scope.patient = $filter('filter')(data.data.data, {SysPK_COA:$routeParams.id})[0];
                }else{
                    toastr.error('No record found.');
                }
            }
        });

        $scope.addcoa = function()
        {
            var coa = $scope.coa;
            coa.SysPK_COA = rfc4122.v4();
            coaDataFactory.addCOA(coa).then(function(){
                $location.path('/caos');
            });
        };

        $scope.updatecoa = function()
        {
            var coa = $scope.coa;
            patientDataFactory.updateCOA(coa).then(function(){
                $window.history.back();
            });
        };

        $scope.deletecoa = function()
        {
            if($scope.id !='') {
                $confirm({text: 'Are you sure you want to delete?', title: 'Confirm', ok: 'Yes', cancel: 'No'})
                    .then(function () {
                        coaDataFactory.deleteCOA($scope.id).success(function () {
                            coaDataFactory.getCOAs().then(function (data) {
                                $scope.coas = data.data;
                                $scope.id = '';
                                toastr.success('COA successfully deleted.');
                            });
                        });
                    });
            }else{
                toastr.error('Please select coa to delete.');
            }

        };

        $scope.setID = function(coa)
        {
            $scope.id = coa.SysPK_COA;

            if ($scope.lastSelected) {
                $scope.lastSelected.selected = '';
            }
            this.selected = 'active';
            $scope.lastSelected = this;
        };

        //for modal paient list
        $scope.showModal = false;
        $scope.toggleModal = function(){
            $scope.showModal = !$scope.showModal;
        };

    }]);