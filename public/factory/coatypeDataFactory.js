/**
 * Created by kent on 10/20/2015.
 */

'use strict';
app.factory('coatypeDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    console.log('Inside coatype data factory ');
    var coatypesDataFactory = {};

    coatypesDataFactory.getCOATypes = function(){
        return $http.get(urlBase + '/api/coatypes');
    };

    coatypesDataFactory.addCOAType = function(coatype){
        return $http.post(urlBase + '/api/coatypes', coatype);
    };

    coatypesDataFactory.updateCOAType = function(coatype){
        return $http.put(urlBase + '/api/coatypes/' + coatype.SysPK_CoaTM,coatype);
    };

    coatypesDataFactory.getCOAType = function(id){
        return $http.get(urlBase + '/api/coatypes/' + id);
    };

    coatypesDataFactory.deleteCOAType = function(id){
        return $http.delete(urlBase + '/api/coatypes/' + id);
    };


    return coatypesDataFactory;
});
