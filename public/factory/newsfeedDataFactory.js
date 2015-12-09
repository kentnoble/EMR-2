/**
 * Created by kent on 12/8/2015.
 */

'use strict';

app.factory('newsfeedDataFactory',function($http) {
    /** https://docs.angularjs.org/guide/providers **/
    var newsfeedsDataFactory = {};

    newsfeedsDataFactory.getAllNewsfeeds = function () {
        return $http.get(urlBase + '/getAllNewsfeeds');
    };

    newsfeedsDataFactory.addNewsfeed = function(newsfeed){
        return $http.post(urlBase + '/api/newsfeeds', newsfeed);
    };

    return newsfeedsDataFactory;

});

