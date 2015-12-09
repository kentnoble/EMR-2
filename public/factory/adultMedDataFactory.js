/**
 * Created by kent on 11/10/2015.
 */
'use strict';

app.factory('adultmedDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    console.log('Inside adultmed data factory ');
    var adultmedsDataFactory = {};

    adultmedsDataFactory.getallAdultMeds = function(){
        return $http.get(urlBase + '/transactions/adultmedicine');
    };

    adultmedsDataFactory.getAdultMed = function(id){
        return $http.get(urlBase + '/transactions/adultmedicine/' + id);
    };

    adultmedsDataFactory.addAdultMed = function(adultmedicine){
        return $http.post(urlBase + '/api/adultmedicines', adultmedicine);
    };


    adultmedsDataFactory.updateAdultMed = function(adultmedicine){
        return $http.put(urlBase + '/api/adultmedicines/' + adultmedicine.SysPK_AdultMed,adultmedicine);
    };

    adultmedsDataFactory.deleteAdultMed = function(id){
        return $http.delete(urlBase + '/api/adultmedicines/' + id);
    };


    return adultmedsDataFactory;
});
