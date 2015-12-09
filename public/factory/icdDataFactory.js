/**
 * Created by kent on 10/24/2015.
 */

'use strict';

app.factory('icdDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    console.log('Inside icd data factory ');
    var icdsDataFactory = {};

    icdsDataFactory.getICDs = function(){
        return $http.get(urlBase + '/api/icd10s');
    };
    icdsDataFactory.getICD = function(id){
        return $http.get(urlBase + '/api/icd10s/' + id);
    };

    return icdsDataFactory;
});

