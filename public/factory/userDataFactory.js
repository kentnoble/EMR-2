/**
 * Created by alain.bibera on 9/22/2015.
 */
'use strict';

app.factory('userDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    //console.log('Inside user data factory ');
    var usersDataFactory = {};

    usersDataFactory.addUser = function(user){
        return $http.post(urlBase + '/api/users', user);
    };

    usersDataFactory.updateUser = function(user){
        return $http.put(urlBase + '/api/users/' + user.SysPK_User,user);
    };

    usersDataFactory.deleteUser = function(id){
        return $http.delete(urlBase + '/api/users/' + id);
    };

    usersDataFactory.getUser = function(username){
        return $http.get(urlBase + '/users/' +username);
    };
    usersDataFactory.getUsers = function(){
        return $http.get(urlBase + '/api/users/');
    };

    return usersDataFactory;
});