/**
 * Created by kent on 10/30/2015.
 */

'use strict';

app.factory('requestDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    console.log('Inside request data factory ');
    var requestsDataFactory = {};

    requestsDataFactory.getRequests = function(){
        return $http.get(urlBase + '/api/requests');
    };

    requestsDataFactory.addRequest = function(request){
        return $http.post(urlBase + '/api/requests', request);
    };

    requestsDataFactory.updateRequest = function(request){
        return $http.put(urlBase + '/api/requests/' + request.SysPK_Request,request);
    };

    requestsDataFactory.getRequest = function(id){
        return $http.get(urlBase + '/api/requests/' + id);
    };

    requestsDataFactory.deleteRequest = function(id){
        return $http.delete(urlBase + '/api/requests/' + id);
    };


    return requestsDataFactory;
});

