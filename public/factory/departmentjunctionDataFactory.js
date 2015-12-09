/**
 * Created by kent on 10/27/2015.
 */

'use strict';
app.factory('departmentjunctionDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    console.log('Inside user data factory ');
    var departmentjunctionsDataFactory = {};

    departmentjunctionsDataFactory.getDepartmentJunctions = function(){
        return $http.get(urlBase + '/api/departmentjunctions');
    };

    departmentjunctionsDataFactory.addDepartmentJunction = function(departmentjunction){
        return $http.post(urlBase + '/api/departmentjunctions', departmentjunction);
    };

    departmentjunctionsDataFactory.updateDepartmentJunction = function(departmentjunction){
        return $http.put(urlBase + '/api/departmentjunctions/' + departmentjunction.SysPK_Department,departmentjunction);
    };

    departmentjunctionsDataFactory.getDepartmentJunction = function(id){
        return $http.get(urlBase + '/api/departmentjunctions/' + id);
    };

    departmentjunctionsDataFactory.deleteDepartmentJunction = function(id){
        return $http.delete(urlBase + '/api/departmentjunctions/' + id);
    };

    return departmentjunctionsDataFactory;
});

