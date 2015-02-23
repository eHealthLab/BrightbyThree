

/**
 * Controller which manages the completion state of the navbar
 */

//var bb3App = angular.module('bb3', []);

bb3App.controller('stateController',
    function($scope, $window, $http) {

        /**
         * Initialize the controller
         */
        init();
        function init() {
            $scope.login = false;
            $scope.currentLanguage = "English";
            $scope.loginMinutesEnabled = false;
            $scope.badgesEnabled = false;
            $scope.goalsEnabled = false;
            $scope.networkStatsEnabled = false;
        }

        $scope.getLoginStatus = function() {
            window.loginStatus = $scope.login;
            //return $scope.login;
        };

        $scope.changeLoginStatus = function() {
            window.alert('called function');
            $scope.login = false;
        }
})

    .controller('dashboardController',
    function ($scope, $window, $http) {

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
    function ($scope, $window, $http, $location, $element) {
        init();
        function init() {
            $scope.firstName = undefined;
            $scope.lastName = undefined;
            $scope.emailID = undefined;
            $scope.password1 = undefined;
            $scope.password2 = undefined;
            $scope.phoneNumber = undefined;
            $scope.zipcode = undefined;
            $scope.babyName = undefined;
            $scope.babyDOB = undefined;
            $scope.babyGender = undefined;
            $scope.loginSucessful = true;

        }

        $scope.getBabyName = function() {
            $scope.babyName = "notDefault";
            return $scope.babyName;
        };

        $scope.submitSignupInfo = function() {
            window.alert('signup pressed');
            var email = $scope.emailID.toUpperCase();

            $http.get('http://brightbythree.org:3000/loginSignup/' + email + '/'
            + $scope.password).
                success(function(data, status, headers, config) {
                    $window.alert("values: " + email + $scope.password);
            })
        };

        $scope.submitLoginInfo = function() {


            var email = $scope.emailID.toUpperCase();

                $http.get('http://brightbythree.org:3000/loginSignup/' + email + '/' + $scope.password).
                    success(function (data, status, headers, config) {
                        $window.alert("values: " + email + $scope.password);
                        $scope.appsData = data;
                        if ($scope.appsData != "false") {
                            window.alert('Login successful');
                            $scope.login = true;
                            $location.path("dashboard.html");
                            $scope.loginSucessful = true;
                            $scope.emailID = "";
                            $scope.password = "";

                        }
                        else {
                            $scope.loginErrorNotification = "check the info and login again.";
                            window.alert('Check the login information and try again.');
                        }
                    }).
                    error(function (data, status, headers, config) {
                        window.alert("sorry, error");
                        window.alert("Unable to contact server. Please try again later.");
                    });
            }
    })

    .controller('textMessageController',
    function ($scope, $window) {
        init();

        function init() {

            $scope.sampleTextSubject = "Language Power";
            $scope.sampleTextContent = "Daily bedtime reading promotes positive " +
            "talking and helps your baby’s brain grow during sleep!";
            $scope.sampleTextImage = "../images/BB3_logo_vert_rgb.png";
            $scope.sampleTextVideo = "https://www.youtube.com/embed/mN5rIVbUG7M";

        }

        $scope.addToFavoritesPressed = function(){
            window.alert('add to favorites pressed');
        };

        $scope.removeFromFavoritesPressed = function(){
            window.alert('remove from favorites pressed');
        };

        $scope.startCameraPressed = function(){
            window.alert('start camera pressed');
        };
    })


    .controller('badgesController',
    function ($scope, $window) {
        init();

        function init() {

            $scope.totalPoints = 0;
            $scope.participantID = undefined;
            $scope.status150 = true;
            $scope.status400 = false;
            $scope.status700 = false;
            $scope.status1000 = false;
            $scope.status1500 = false;
            $scope.status2000 = false;
            $scope.status2500 = false;
            $scope.status3000 = true;
            $scope.status3500 = false;
            $scope.status4000 = false;
            $scope.status4500 = false;
            $scope.status5000 = false;

        }

        $scope.getBadgeInformation = function () {
            window.alert('badge information pressed');
            if ($scope.totalPoints >= 150 && $scope.totalPoints < 400) {
                $scope.status150 = true;
            }

            else if ($scope.totalPoints >= 400 && $scope.totalPoints < 700) {
                $scope.status400 = true;
            }

            else if ($scope.totalPoints >= 700 && $scope.totalPoints < 1000) {
                $scope.status700 = true;
            }

            else if ($scope.totalPoints >= 1000 && $scope.totalPoints < 1500) {
                $scope.status1000 = true;
            }

            else if ($scope.totalPoints >= 1500 && $scope.totalPoints < 2000) {
                $scope.status1500 = true;
            }

            else if ($scope.totalPoints >= 2000 && $scope.totalPoints < 2500) {
                $scope.status2000 = true;
            }

            else if ($scope.totalPoints >= 2500 && $scope.totalPoints < 3000) {
                $scope.status2500 = true;
            }

            else if ($scope.totalPoints >= 3000 && $scope.totalPoints < 3500) {
                $scope.status3000 = true;
            }

            else if ($scope.totalPoints >= 3500 && $scope.totalPoints < 4000) {
                $scope.status3500 = true;
            }

            else if ($scope.totalPoints >= 4000 && $scope.totalPoints < 4500) {
                $scope.status4000 = true;
            }

            else if ($scope.totalPoints >= 4500 && $scope.totalPoints < 5000) {
                $scope.status4500 = true;
            }

            else if ($scope.totalPoints >= 5000) {
                $scope.status5000 = true;
            }

        };

        $scope.updateBadgeInformation = function () {
            window.alert('update badge information pressed');
        };

    })

    .controller('emailController',
    function ($scope, $window, $http) {
        init();

        function init() {

            $scope.feedbackText = undefined;

        }

        $scope.sendEmailForgotEmailID = function () {

            window.alert('forgot email id called');
            $window.plugin.email.open({
                to:      ['agileehealth@gmail.com'],
                subject: 'Forgot my email id',
                body:    'I have forgotten my email id. Please contact me at BLAH'
            });

        };

        $scope.sendEmailForgotPassword = function () {

            window.alert('forgot password called');
            $window.plugin.email.open({
                to:      ['agileehealth@gmail.com'],
                subject: 'Forgot my password',
                body:    'I have forgotten my password. ' +
                'Please contact me at BLAH'
            });

        };

        $scope.sendFeedback = function() {
            window.alert("inside feedback function" + $scope.feedbackText);
            if ($scope.feedbackText != undefined) {
                //if(participantService.getLoginStatus() != "false") {

                    $http({method: 'POST',
                        url: 'http://brightbythree.org:3000/feedback/' +
                        //url: 'http://mothersmilk.ucdenver.edu:3000/feedback/' +
                        $scope.feedbackText
                    }).
                    success(function(data, status, headers, config) {
                        $scope.appsData = data;
                        if(data == "Success") {
                            if ($scope.currentLanguage == "English") {
                                window.alert("Thank You! Your feedback has been submitted.");
                                $location.path("../pages/settings.html");
                            }
                            else if ($scope.currentLanguage == "Español") {
                                window.alert("¡Gracias! Sus comentarios fueron entregados.");
                                $location.path("../pages/settings.html");
                            }
                        }


                    }).
                    error(function(data, status, headers, config) {
                        if ($scope.currentLanguage == "English") {
                            window.alert("Unable to contact server. Please try again later.");
                        }
                        else if ($scope.currentLanguage == "Español") {
                            window.alert("No puede comunicarse con el servidor. Por favor de intentarlo más tarde. ");
                        }


                    });

                //}

                //else {
                    if ($scope.currentLanguage == "English") {
                        window.alert("Please login first.");
                        $location.path("/login");
                    }
                    else if ($scope.currentLanguage == "Español") {
                        window.alert("Por favor de hacer login primero.");
                        $location.path("/spanish/login");
                    }


               // }
            }
        }

    })

;