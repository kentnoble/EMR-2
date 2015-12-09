/**
 * Created by kent on 10/17/2015.
 */

'use strict';

app.factory('transactionDataFactory',function($http) {
    /** https://docs.angularjs.org/guide/providers **/
    var transactionsDataFactory = {};

    transactionsDataFactory.getPatientTransactions = function (id) {
        return $http.get(urlBase + '/patientTransactions/' + id);
    };

    transactionsDataFactory.getDepartmentTransactions = function (id) {
        return $http.get(urlBase + '/departmentTransactions/' + id);
    };

    transactionsDataFactory.addTransaction = function (transaction) {
        return $http.post(urlBase + '/api/transactions', transaction);
    };

    return transactionsDataFactory;

});
