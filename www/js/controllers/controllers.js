

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
            $scope.login = true;
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
            $scope.firstName = "default";
            $scope.lastName = "default";
            $scope.emailID = "default";
            $scope.password1 = "default";
            $scope.password2 = "default";
            $scope.phoneNumber = null;
            $scope.zipcode = null;
            $scope.babyName = "default";
        }


        $scope.getBabyName = function() {
            $scope.babyName = "notDefault";
            return $scope.babyName;
        };

        $scope.submitSignupInfo = function() {
            window.alert('signup pressed');

        };

        $scope.submitLoginInfo = function() {
            window.alert('login pressed');

            var email = $scope.emailID.toUpperCase();

            $http.get('http://brightbythree.org/bb20:3000/loginSignup/' + email + '/' + $scope.newParticipant.password).
                success(function(data, status, headers, config) {
                    $scope.appsData = data;
                    if ($scope.appsData != "false") {

                    }
                    else {
                        $scope.loginErrorNotification = "check the info and login again.";
                        window.alert('Check the login information and try again.');
                    }
                }).
                error(function(data, status, headers, config) {
                        window.alert("sorry, error");
                        window.alert("Unable to contact server. Please try again later.");

                });

        }

    })

    .controller('textMessageController',
    function ($scope, $window) {
        init();

        function init() {

            $scope.sampleTextSubject = "Subject Line 1";
            $scope.sampleTextContent = "This is Sample content 1 from scope " +
            "variable in controller";
            $scope.sampleTextImage = "../images/BB3_logo_vert_rgb.png";
            $scope.sampleTextVideo = "https://www.youtube.com/embed/oVPr2LAyhRM";

        }

        $scope.addToFavorites = function(){
            window.alert('add to favorites pressed');
        }


    })

;