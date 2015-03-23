
/*
* Main BB3 application module
 */


'use strict';
    // this function is strict..


var bb3App = angular.module('bb3', ['ui.bootstrap'])
    .config(['$routeProvider', function($routeProvider) {
        /*
         * Main route provider for the study design tab
         */
        $routeProvider

            .when('/',
            {templateUrl: 'index.html', controller: 'stateController' }
        )

           .when('/goals',
            {templateUrl: 'pages/goals.html', controller: 'goalsController' }
        )
            .when('/badges',
            {templateUrl: 'pages/badges.html', controller: 'badgesController' }
        )

            .when('/about',
            {templateUrl: 'pages/aboutUs.html', controller: 'badgesController' }
        )

            .otherwise({ redirectTo: '/' });

    }]);





