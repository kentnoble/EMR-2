/**
 * Created by kent on 10/22/2015.
 */

'use strict';

app.factory('ledgerInvtyDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    console.log('Inside user data factory ');
    var lgdrInventoriesDataFactory = {};

    lgdrInventoriesDataFactory.getLedgerInvties = function(id){
        return $http.get(urlBase + '/transactions/ledgerinventories/'+id);
    };

    lgdrInventoriesDataFactory.addLedgerInvty = function(ledgerinventory){
        return $http.post(urlBase + '/api/ledgerinventories', ledgerinventory);
    };


    lgdrInventoriesDataFactory.updateLedgerInvty = function(ledgerinventory){
        return $http.put(urlBase + '/api/ledgerinventories/' + ledgerinventory.SysPK_LdgrInvty,ledgerinventory);
    };

    lgdrInventoriesDataFactory.getLedgerInvty = function(id){
        return $http.get(urlBase + '/api/ledgerinventories/' + id);
    };

    lgdrInventoriesDataFactory.deleteLedgerInvty = function(id){
        return $http.delete(urlBase + '/api/ledgerinventories/' + id);
    };


    return lgdrInventoriesDataFactory;
});
