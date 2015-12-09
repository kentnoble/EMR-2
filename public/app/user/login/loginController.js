/**
 * Created by alain.bibera on 8/19/2015.
 */

'use strict';

app.controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$auth', 'toastr', 'oluserDataFactory', 'userDataFactory', 'rfc4122',
    function($scope, $rootScope, $location, $auth, toastr, oluserDataFactory, userDataFactory, rfc4122) {
    $scope.user = {};
    $rootScope.onlineUser = {};

    $scope.login = function() {
        $auth.login($scope.user)
            .then(function() {
                userDataFactory.getUser($scope.user.UserName_User).then(function(data) {
                    $rootScope.user.name = data.data[0].Name_User;
                    $rootScope.user.sysfk = data.data[0].SysFK_User_User;
                    $rootScope.user.syspk = data.data[0].SysPK_User;
                    $auth.setCookie(data.data[0]);
                });

                /////update token
                $scope.onlineUser.Token_OLUser = $auth.getToken();
                $scope.onlineUser.UserName_OLUser = $scope.user.UserName_User;
                oluserDataFactory.getCurrentUser($scope.user.UserName_User).then(function(data){
                    if(data.data.length === 0) {
                        $rootScope.onlineUser.SysPK_OLUser = rfc4122.v4();
                        oluserDataFactory.addOLUser($scope.onlineUser);
                    }else{
                        $rootScope.onlineUser.SysPK_OLUser = data.data[0].SysPK_OLUser
                        oluserDataFactory.updateOLUser($scope.onlineUser);
                    }
                });
                toastr.success('You have successfully signed in');
                $location.path('/newsfeed');
            })
            .catch(function(response) {
                toastr.error(response.data.message, response.status);
            });
    };
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
            .then(function() {
                toastr.success('You have successfully signed in with ' + provider);
                $location.path('/patient-setup');
            })
            .catch(function(response) {
                toastr.error(response.data.message);
            });
    };

    //  if (!$auth.isAuthenticated()) { return; }

    $auth.logout()
        .then(function() {
            $auth.removeCookie();
            //toastr.info('You have been logged out');
            $location.path('/login');
        });
}]);