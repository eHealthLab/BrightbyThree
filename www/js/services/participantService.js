/*
* Bright by Three
* Copyright (C) 2015 Regents of the University of Colorado.
*
* This program is free software; you can redistribute it and/or
* modify it under the terms of the GNU General Public License
* as published by the Free Software Foundation; either version 2
* of the License, or (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/


bb3App.factory('participantService', function($http, $q) {
    var participantServiceInstance = {};

    /**
     *  add the participant
     */

    var loginStatus = "false";

    var languageStatus = "true";

    participantServiceInstance.numberOfUnread = 0;

    participantServiceInstance.globalLoginStatus = 'false';

    participantServiceInstance.ppStatus = "false";

    participantServiceInstance.registerDate = "";

    participantServiceInstance.textMessage_ID = 0;

    participantServiceInstance.message = "";

    participantServiceInstance.textMessage_inflag = 0;

    participantServiceInstance.textMessage_inb = 0;

    participantServiceInstance.messageArray = '';

    participantServiceInstance.spanishMessageArray = '';

    participantServiceInstance.goalsDaysPerWeek = 2;

    participantServiceInstance.goalsMinutesPerDay = 10;

    participantServiceInstance.logMinutes = 10;

    participantServiceInstance.earnedNewBadge = true;

    participantServiceInstance.getEarnedNewBadge = function () {
        return participantServiceInstance.earnedNewBadge;
    }

    participantServiceInstance.setEarnedNewBadge = function (status) {
        participantServiceInstance.earnedNewBadge = status;
    }

    participantServiceInstance.getLogMinutes = function () {
        return participantServiceInstance.logMinutes;
    }

    participantServiceInstance.setLogMinutes = function (minutes) {
        participantServiceInstance.logMinutes = minutes;
    }

    participantServiceInstance.getGoalsDays = function () {
        return participantServiceInstance.goalsDaysPerWeek;
    }

    participantServiceInstance.getGoalsMinutes = function () {
        return participantServiceInstance.goalsMinutesPerDay;
    }

    participantServiceInstance.setGoalsDays = function (days) {
        participantServiceInstance.goalsDaysPerWeek = days;
    }

    participantServiceInstance.setGoalsMinutes = function (minutes) {
        participantServiceInstance.goalsMinutesPerDay = minutes;
    }

    participantServiceInstance.getTextMessageID = function() {
        return participantServiceInstance.textMessage_ID;
    }

    participantServiceInstance.getMessage = function() {
        return participantServiceInstance.message;
    }

    participantServiceInstance.getTextMessageInFlag = function() {
        return participantServiceInstance.textMessage_inflag;
    }

    participantServiceInstance.getTextMessageInb = function() {
        return participantServiceInstance.textMessage_inb;
    }

    participantServiceInstance.getMessageArray = function() {
        return participantServiceInstance.messageArray;
    }

    participantServiceInstance.getSpanishMessageArray = function() {
        return participantServiceInstance.spanishMessageArray;
    }

    participantServiceInstance.getRegisterDate = function() {
        return participantServiceInstance.registerDate;
    }

    participantServiceInstance.getppStatus = function() {
        return participantServiceInstance.ppStatus;
    }

    participantServiceInstance.setppStatus = function(statusPP) {
        participantServiceInstance.ppStatus = statusPP;
    }

    participantServiceInstance.getUnreadTextStatus = function()  {
        return participantServiceInstance.numberOfUnread;
    }

    participantServiceInstance.setUnreadTextStatus = function(totalUnread)  {
        participantServiceInstance.numberOfUnread = totalUnread;
    }

    participantServiceInstance.getLoginStatus = function() {
        return participantServiceInstance.globalLoginStatus;
    }

    participantServiceInstance.setLoginStatus = function(loginStatusID) {
        //window.alert(participantServiceInstance.globalLoginStatus);
        loginStatus = loginStatusID;
        participantServiceInstance.globalLoginStatus = loginStatusID;
        //window.alert(participantServiceInstance.globalLoginStatus);
    }

    participantServiceInstance.setLanguageStatus = function(languageStatusID) {
        languageStatus = languageStatusID;
    }

    participantServiceInstance.getLanguageStatus = function() {
        //window.alert(languageStatus);
        return languageStatus;
    }

    participantServiceInstance.add = function(participant) {
        //Creating a deferred object
        var deferred = $q.defer();
        window.alert("inside service");
        //Calling Web API to fetch shopping cart items
        $http.post('/', angular.toJson(participant)).success(function(data){
             window.alert("success");
            //Passing data to deferred's resolve function on successful completion
            deferred.resolve(data);
        }).error(function(response) {
                window.alert("failure");
                //Sending a friendly error message in case of failure
                deferred.reject(response);
            });

        //Returning the promise object
        return deferred.promise;
    };

    /**
     *  add more functions as appropriate
     */

    return participantServiceInstance;

})

