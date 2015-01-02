

/**
 * Controller which manages the completion state of the navbar
 */

var bb3App = angular.module('bb3App', []);

bb3App.controller('stateController',
    function($scope) {

        /**
         * Initialize the controller
         */
        init();
        function init() {

            $scope.login = false;
        }

        $scope.getLoginStatus = function() {
            return $scope.login;
        };
});