/**
 * Created by kent on 10/27/2015.
 */

'use strict';

app.factory('obgyneDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    var obgynesDataFactory = {};

    obgynesDataFactory.getallObgynes = function(){
        return $http.get(urlBase + '/transactions/obgyne');
    };

    obgynesDataFactory.addObgyne = function(obgyne){
        return $http.post(urlBase + '/api/obgynes', obgyne);
    };


    obgynesDataFactory.updateObgyne = function(obgyne){
        return $http.put(urlBase + '/api/obgynes/' + obgyne.SysPK_Obgyne,obgyne);
    };

    obgynesDataFactory.getObgyne = function(id){
        return $http.get(urlBase + '/api/obgynes/' + id);
    };

    obgynesDataFactory.deleteObgyne = function(id){
        return $http.delete(urlBase + '/api/obgynes/' + id);
    };


    return obgynesDataFactory;
});
