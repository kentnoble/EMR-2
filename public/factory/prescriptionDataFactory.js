/**
 * Created by kent on 10/30/2015.
 */

'use strict';

app.factory('prescriptionDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    console.log('Inside prescription data factory ');
    var prescriptionsDataFactory = {};

    prescriptionsDataFactory.getPrescriptions = function(){
        return $http.get(urlBase + '/api/prescriptions');
    };

    prescriptionsDataFactory.addPrescription = function(prescription){
        return $http.post(urlBase + '/api/prescriptions', prescription);
    };

    prescriptionsDataFactory.updatePrescription = function(prescription){
        return $http.put(urlBase + '/api/prescriptions/' + prescription.SysPK_Doctor,prescription);
    };

    prescriptionsDataFactory.getPrescription = function(id){
        return $http.get(urlBase + '/api/prescriptions/' + id);
    };

    prescriptionsDataFactory.deletePrescription = function(id){
        return $http.delete(urlBase + '/api/prescriptions/' + id);
    };


    return prescriptionsDataFactory;
});
