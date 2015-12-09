/**
 * Created by kent on 10/24/2015.
 */

'use strict';
app.factory('diagnoseDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    console.log('Inside diagnoses data factory ');
    var diagnosesDataFactory = {};

    diagnosesDataFactory.getDiagnoses = function(){
        return $http.get(urlBase + '/api/diagnoses');
    };

    diagnosesDataFactory.getDiagnose = function(id){
        return $http.get(urlBase + '/api/diagnoses/' + id);
    };

    diagnosesDataFactory.addDiagnose = function(diagnose){
        return $http.post(urlBase + '/api/diagnoses', diagnose);
    };

    diagnosesDataFactory.updateDiagnose = function(diagnose){
        return $http.put(urlBase + '/api/diagnoses/' + diagnose.SysPK_Diagnoses,diagnose);
    };

    diagnosesDataFactory.deleteDiagnose = function(id){
        return $http.delete(urlBase + '/api/diagnoses/' + id);
    };


    return diagnosesDataFactory;
});

