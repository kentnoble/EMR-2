/**
 * Created by kent on 10/15/2015.
 */

'use strict';

app.factory('departmentDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    //console.log('Inside user data factory ');
    var departmentsDataFactory = {};

    departmentsDataFactory.addDepartment = function(department){
        return $http.post(urlBase + '/api/departments', department);
    };



    departmentsDataFactory.updateDepartment = function(department){
        return $http.put(urlBase + '/api/departments/' + department.SysPK_Department,department);
    };

    departmentsDataFactory.deleteDepartment = function(id){
        return $http.delete(urlBase + '/api/departments/' + id);
    };


    return departmentsDataFactory;
});
