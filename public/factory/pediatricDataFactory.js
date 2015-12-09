/**
 * Created by kent on 11/10/2015.
 */

'use strict';

app.factory('pediatricDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    console.log('Inside pediatric data factory ');
    var pediatricsDataFactory = {};

    pediatricsDataFactory.getallPediatrics = function(){
        return $http.get(urlBase + '/transactions/pediatric');
    };

    pediatricsDataFactory.getPediatric = function(id){
        return $http.get(urlBase + '/transactions/pediatric/' + id);
    };

    pediatricsDataFactory.addPediatric = function(pediatric){
        return $http.post(urlBase + '/api/pediatrics', pediatric);
    };


    pediatricsDataFactory.updatePediatric = function(pediatric){
        return $http.put(urlBase + '/api/pediatrics/' + pediatric.SysPK_Pediatric,pediatric);
    };

    pediatricsDataFactory.deletePediatric = function(id){
        return $http.delete(urlBase + '/api/pediatrics/' + id);
    };


    return pediatricsDataFactory;
});
