/**
 * Created by kent on 11/26/2015.
 */

'use strict';

app.factory('oluserDataFactory',function($http, $auth){
    /** https://docs.angularjs.org/guide/providers **/
    //console.log('Inside user data factory ');
    var olusersDataFactory = {};

    olusersDataFactory.addOLUser = function(oluser){
        return $http.post(urlBase + '/api/onlineusers', oluser);
    };

    olusersDataFactory.updateOLUser = function(oluser){
        return $http.put(urlBase + '/api/onlineusers/' + oluser.SysPK_OLUser,oluser);
    };

    olusersDataFactory.getOLUsers = function(){
        return $http.get(urlBase + '/api/onlineusers');
    };

    olusersDataFactory.getCurrentUser = function(id){
        return $http.get(urlBase + '/onlineuser/' + id);
    };

    olusersDataFactory.getOLUserToken = function(){
        return $http.get(urlBase + '/onlineusertoken/' + $auth.getToken());
    };

    return olusersDataFactory;
});
