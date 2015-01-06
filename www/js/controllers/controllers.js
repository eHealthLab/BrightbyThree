

/**
 * Controller which manages the completion state of the navbar
 */

//var bb3App = angular.module('bb3', []);

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
            //return $scope.login;
        };

        $scope.changeLoginStatus = function() {
            window.alert('called function');
            $scope.login = true;

        }
})

    .controller('dashboardController',
    function ($scope, $window) {

        init();
        function init() {
            $scope.status = false;
        }

        $scope.getStatus = function() {

            $scope.$on("$includeContentLoaded", function(){
                $("#dashboard").trigger("create");
            });

            return $scope.status;
        };
    })

    .controller('personalInfoController',
    function ($scope, $window) {
        init();
        function init() {
            $scope.babyName = "default";
        }


        $scope.getBabyName = function() {
            $scope.babyName = "notDefault";
            return $scope.babyName;
        };

        $scope.submitSignupInfo = function() {
            window.alert('signup pressed');

        };

    });