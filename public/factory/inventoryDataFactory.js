/**
 * Created by kent on 10/21/2015.
 */

'use strict';

app.factory('inventoryDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    console.log('Inside inventory data factory ');
    var inventoriesDataFactory = {};

    inventoriesDataFactory.getInventories = function(){
        return $http.get(urlBase + '/api/inventories');
    };

    inventoriesDataFactory.addInventory = function(inventory){
        return $http.post(urlBase + '/api/inventories', inventory);
    };

    inventoriesDataFactory.updateInventory = function(inventory){
        return $http.put(urlBase + '/api/inventories/' + inventory.SysPK_Invty,inventory);
    };

    inventoriesDataFactory.getInventory = function(id){
        return $http.get(urlBase + '/api/inventories/' + id);
    };

    inventoriesDataFactory.deleteInventory = function(id){
        return $http.delete(urlBase + '/api/inventories/' + id);
    };


    return inventoriesDataFactory;
});
