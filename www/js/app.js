
/*
* Main BB3 application module
 */

(function () {
    "use strict";
    // this function is strict...
}());


var bb3App = angular.module('bb3', [])
    .config(['$routeProvider', function($routeProvider) {
        /*
         * Main route provider for the study design tab
         */
        $routeProvider
            .when('/',
            {templateUrl: 'pages/index.html', controller: 'solutionTypeController'}
        )

            .when('/dashboard',
            {templateUrl: 'pages/dashboard.html', controller: 'goalsController'}
        )

    }]);





