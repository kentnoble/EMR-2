/**
 * Created by kent on 11/12/2015.
 */

'use strict';

app.controller('NewsfeedCtrl', ['$scope', '$rootScope', '$location', 'toastr', 'newsfeedDataFactory', 'rfc4122',
    function($scope, $rootScope, $location, toastr, newsfeedDataFactory, rfc4122) {

        $scope.newsfeeds = [];
        newsfeedDataFactory.getAllNewsfeeds().then(function(data) {
            $scope.newsfeeds = data.data;
        });

    }
]);

