/**
 * Created by kent on 10/9/2015.
 */

'use strict';
app.factory('doctorDataFactory',function($http){
    /** https://docs.angularjs.org/guide/providers **/
    console.log('Inside user data factory ');
    var doctorsDataFactory = {};

    doctorsDataFactory.getDoctors = function(){
        return $http.get(urlBase + '/api/doctors');
    };

    doctorsDataFactory.getLastDoctorID = function(){
        return $http.get(urlBase + '/lastDoctorID');
    };

    doctorsDataFactory.addDoctor = function(doctor){
        return $http.post(urlBase + '/api/doctors', doctor);
    };

    doctorsDataFactory.updateDoctor = function(doctor){
        return $http.put(urlBase + '/api/doctors/' + doctor.SysPK_Doctor,doctor);
    };

    doctorsDataFactory.getDoctor = function(id){
        return $http.get(urlBase + '/api/doctors/' + id);
    };

    doctorsDataFactory.deleteDoctor = function(id){
        return $http.delete(urlBase + '/api/doctors/' + id);
    };


    return doctorsDataFactory;
});
