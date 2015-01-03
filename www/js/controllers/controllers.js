

/**
 * Controller which manages the completion state of the navbar
 */

var bb3App = angular.module('bb3App', []);

bb3App.controller('stateController',
    function($scope, $window) {

        /**
         * Initialize the controller
         */
        init();
        function init() {

            $scope.login = false;
        }

        $scope.getLoginStatus = function() {
            window.loginStatus = $scope.login;
            return $scope.login;
        };

        $scope.changeLoginStatus = function() {
            window.alert('called function');
            $scope.login = true;
            return;
        }
});