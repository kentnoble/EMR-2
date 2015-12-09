/**
 * Created by kent on 10/7/2015.
 */

'use strict';

app.factory('encounterDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    var encountersDataFactory = {};

    encountersDataFactory.getEncountersByDoctorNotServe = function(id, date){
        return $http.get(urlBase + '/getEncountersByDoctorNotServe/' + id +'/' + date);
    };

    encountersDataFactory.getallEncountersByDoctor = function(id, date){
        return $http.get(urlBase + '/getallEncountersByDoctor/' + id + '/' + date);
    };
////

    encountersDataFactory.getEncounters = function(){
        return $http.get(urlBase + '/encounters');
    };
    encountersDataFactory.getEncountersServed = function(isServed){
        var served = ((isServed)?'served' : 'notserve');
        return $http.get(urlBase + '/encounters/' + served);
    };
    encountersDataFactory.getEncounter = function(id){
        return $http.get(urlBase + '/api/encounters/' + id);
    };

    encountersDataFactory.addEncounter = function(encounter){
        return $http.post(urlBase + '/api/encounters', encounter);
    };

    encountersDataFactory.updateEncounter = function(encounter){
        return $http.put(urlBase + '/api/encounters/' + encounter.SysPK_Encounter,encounter);
    };

    encountersDataFactory.deleteEncounter = function(id){
        return $http.delete(urlBase + '/api/encounters/' + id);
    };


    return encountersDataFactory;
});