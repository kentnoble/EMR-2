/**
 * Created by kent on 10/20/2015.
 */

'use strict';
app.factory('coaDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    console.log('Inside coa data factory ');

    var coasDataFactory = {};

    coasDataFactory.getCOAs = function(id){
        return $http.get(urlBase + '/coas/'+id);
    };

    coasDataFactory.addCOA = function(coa){
        return $http.post(urlBase + '/api/coas', coa);
    };

    coasDataFactory.updateCOA = function(coa){
        return $http.put(urlBase + '/api/coas/' + coa.SysPK_COA,coa);
    };

    coasDataFactory.getCOA = function(id){
        return $http.get(urlBase + '/api/coas/' + id);
    };

    coasDataFactory.deleteCOA = function(id){
        return $http.delete(urlBase + '/api/coas/' + id);
    };


    return coasDataFactory;
});
