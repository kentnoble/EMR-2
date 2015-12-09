/**
 * Created by kent on 10/28/2015.
 */

'use strict';

app.factory('hospitalizationDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    console.log('Inside hospitalization data factory ');
    var hospitalizationsDataFactory = {};

    hospitalizationsDataFactory.getHospitalizations = function(){
        return $http.get(urlBase + '/api/hospitalizations');
    };

    hospitalizationsDataFactory.addHospitalization = function(hospitalization){
        return $http.post(urlBase + '/api/hospitalizations', hospitalization);
    };

    hospitalizationsDataFactory.updateHospitalization = function(hospitalization){
        return $http.put(urlBase + '/api/hospitalizations/' + hospitalization.SysPK_Hospitalization,hospitalization);
    };

    hospitalizationsDataFactory.getHospitalization = function(id){
        return $http.get(urlBase + '/api/hospitalizations/' + id);
    };

    hospitalizationsDataFactory.deleteHospitalization = function(id){
        return $http.delete(urlBase + '/api/hospitalizations/' + id);
    };


    return hospitalizationsDataFactory;
});
