

/**
 * Controller which manages the completion state of the navbar
 */

//var bb3App = angular.module('bb3', []);

bb3App.controller('stateController',
    function($scope, $window, $http, participantService) {

        /**
         * Initialize the controller
         */
        init();
        function init() {

            $scope.participantService = participantService;
            $scope.login = true;
            $scope.currentLanguage = "English";
            $scope.loginMinutesEnabled = false;
            $scope.badgesEnabled = false;
            $scope.goalsEnabled = false;
            $scope.networkStatsEnabled = false;
            $scope.goalshaveBeenSet = 0;

            $scope.goalsDaysPerWeek = participantService.getGoalsDays();
            $scope.goalsMinutesPerDay = participantService.getGoalsMinutes();

            $scope.newBadgeEarned = participantService.getEarnedNewBadge();
        }

        $scope.getLoginStatus = function() {
            window.loginStatus = $scope.login;
            //return $scope.login;
        };

        $scope.changeLoginStatus = function() {
            window.alert('called function');
            $scope.login = false;
        };

        $scope.earnedNewBadge = function () {
            return participantService.getEarnedNewBadge();
        };

        $scope.logout = function () {
            if (confirm('Are you sure you want to logout?')) {
                //$scope.loginSuccessful = false;
                $scope.login = false;
                window.alert($scope.login);
                //return $scope.login;
            }
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

            $scope.newParticipant = {
                firstName: undefined,
                lastName: undefined,
                emailID: undefined,
                password1: undefined,
                password2: undefined,
                phoneNumber: undefined,
                zipcode: undefined,
                babyName: undefined,
                babyDOB: undefined,
                babyGender: undefined
            };

            $scope.loginSuccessful = true;

        }

        $scope.getBabyName = function() {
            $scope.newParticipant.babyName = "notDefault";
            return $scope.newParticipant.babyName;
        };

        $scope.submitSignupInfo = function() {
            window.alert('signup pressed');
            var email = $scope.newParticipant.emailID.toUpperCase();

            if($scope.newParticipant.password1 != $scope.newParticipant.password2) {
                //$scope.signUpErrorNotification = "Passwords do not match. Correct them and try again.";
                window.alert('Passwords do not match. Correct them and try again.');
            }

            $http({method: 'POST',
                url: 'http://brightbythree.org:3000/loginSignup/' +
                $scope.newParticipant.firstName + '/' +
                $scope.newParticipant.lastName + '/' +
                email + '/' +
                $scope.newParticipant.password1 + '/' +
                $scope.newParticipant.phoneNumber

                /*
                +
                $scope.newParticipant.babyName +
                $scope.newParticipant.babyDOB +
                $scope.newParticipant.babyGender +
                $scope.newParticipant.babyGender
                */
            }).
                success(function(data, status, headers, config) {
                    $scope.appsData = data;
                    if(data.status == "true") {
                        window.alert("You have successfully signed up. " +
                        "Please login to continue");
                        $location.path("/dashboard");
                    }
                    else {
                        window.alert("Email ID exists. Use a different Email ID.");
                    }
                }).
                error(function(data, status, headers, config) {
                    window.alert("Unable to contact server. Please try again later.");

                });


        };

        $scope.submitLoginInfo = function() {


            window.alert('inside login in button pressed');
            var email = $scope.emailID.toUpperCase();

                $http.get('http://brightbythree.org:3000/loginSignup/' + email + '/' + $scope.password1).
                    success(function (data, status, headers, config) {
                        $window.alert("values: " + email + $scope.password1);
                        $scope.appsData = data;
                        if ($scope.appsData != "false") {
                            window.alert('Login successful');
                            $scope.login = true;
                            $location.path("dashboard.html");
                            $scope.loginSucessful = true;
                            $scope.emailID = "";
                            $scope.password = "";
                            $location.path("/dashboard");
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

    .controller('goalsController',
    function ($scope, $window, $http, $location, participantService) {
        init();

        function init() {

            $scope.participantService = participantService;
            $scope.reset = false;
            $scope.goals =
            {
                daysPerWeek: 2,
                minutesPerDay: 10
            }
        }

        $scope.getGoalsInfo = function () {

            // Put a http call here to grab these values and then set these two.

            $scope.goals.daysPerWeek = 2;
            $scope.goals.minutesPerDay = 10;
            //return $scope.goals;

        };

        $scope.setGoals = function () {

            participantService.goalsDaysPerWeek =
                $scope.goals.daysPerWeek;
            participantService.goalsMinutesPerDay =
                $scope.goals.minutesPerDay;

            if ($scope.goals.daysPerWeek != 2
                || $scope.goals.minutesPerDay != 10) {
                $scope.reset = true;
            }
            else
                $scope.reset = false;
            //$location.path("/dashboard");
            //window.alert($location.path());
            window.alert('Your goals have been set to ' +
            $scope.goals.daysPerWeek + ' days per week and '
            + $scope.goals.minutesPerDay + ' minutes per day');

        };

        $scope.resetGoals = function () {

            if ($scope.goals.daysPerWeek != 2
            || $scope.goals.minutesPerDay != 10)
            {
                $scope.reset = true;
                if (confirm('Are you sure you want to reset your goals?' +
                ' This action can not be undone.')) {

                    //window.alert('inside reset goals');
                    $scope.goals.daysPerWeek = 2;
                    $scope.goals.minutesPerDay = 10;
                    $scope.setGoals();
                    window.alert(participantService.goalsDaysPerWeek
                    + " " + participantService.goalsMinutesPerDay);

            }

            else {
                $scope.reset = false;
                }
                // send a http request for this purpose. to udpate the table.
            }
        }

    })


    .controller('badgesController',
    function ($scope, $window, participantService) {
        init();

        function init() {

            $scope.participantService = participantService;
            $scope.totalPoints = 0;
            $scope.participantID = undefined;

            $scope.statusBadge = [];

            $scope.statusBadge[0][0]= 150;
            $scope.statusBadge[0][1]= false;

            $scope.statusBadge[1][0]= 400;
            $scope.statusBadge[1][1]= false;

            $scope.statusBadge[2][0]= 700;
            $scope.statusBadge[2][1]= false;

            $scope.statusBadge[3][0]= 1000;
            $scope.statusBadge[3][1]= false;

            $scope.statusBadge[4][0]= 1500;
            $scope.statusBadge[4][1]= false;

            $scope.statusBadge[5][0]= 2000;
            $scope.statusBadge[5][1]= false;

            $scope.statusBadge[6][0]= 2500;
            $scope.statusBadge[6][1]= false;

            $scope.statusBadge[7][0]= 3000;
            $scope.statusBadge[7][1]= false;

            $scope.statusBadge[8][0]= 3500;
            $scope.statusBadge[8][1]= false;

            $scope.statusBadge[9][0]= 4000;
            $scope.statusBadge[9][1]= false;

            $scope.statusBadge[10][0]= 4500;
            $scope.statusBadge[10][1]= false;

            $scope.statusBadge[11][0]= 5000;
            $scope.statusBadge[11][1]= false;

            $scope.status150 = true;
            $scope.status400 = true;
            $scope.status700 = false;
            $scope.status1000 = false;
            $scope.status1500 = false;
            $scope.status2000 = false;
            $scope.status2500 = false;
            $scope.status3000 = false;
            $scope.status3500 = false;
            $scope.status4000 = false;
            $scope.status4500 = false;
            $scope.status5000 = false;

            $scope.pointsToEarnNextBadge = 0;
            $scope.nextBadgeToEarn = 1;

        }

        $scope.getBadgeInformation = function () {

            // HTTP request to server and retrieve nextBadgeToEarn

            //window.alert('badge information pressed');

            for (var i=0; i < 12; i++) {


                if ($scope.totalPoints >= $scope.statusBadge[i][0]
                    && $scope.totalPoints < $scope.statusBadge[i+1][0]) {
                    $scope.statusBadge[i][1] = true;
                    participantService.setEarnedNewBadge(true);
                    //$scope.newBadgeEarned = participantService.se
                    window.alert('Congratulations! You just earned a new badge.')
                    break;
                    //return $scope.earnedNewBadge();
                }

            else if ($scope.totalPoints >= 400 && $scope.totalPoints < 700) {
                $scope.status400 = true;
            }

            else if ($scope.totalPoints >= 700 && $scope.totalPoints < 1000) {
                $scope.status700 = true;
            }

            else if ($scope.totalPoints >= 1000 && $scope.totalPoints < 1500) {
                $scope.status1000 = false;
            }

            else if ($scope.totalPoints >= 1500 && $scope.totalPoints < 2000) {
                $scope.status1500 = false;
            }

            else if ($scope.totalPoints >= 2000 && $scope.totalPoints < 2500) {
                $scope.status2000 = false;
            }

            else if ($scope.totalPoints >= 2500 && $scope.totalPoints < 3000) {
                $scope.status2500 = false;
            }

            else if ($scope.totalPoints >= 3000 && $scope.totalPoints < 3500) {
                $scope.status3000 = false;
            }

            else if ($scope.totalPoints >= 3500 && $scope.totalPoints < 4000) {
                $scope.status3500 = false;
            }

            else if ($scope.totalPoints >= 4000 && $scope.totalPoints < 4500) {
                $scope.status4000 = false;
            }

            else if ($scope.totalPoints >= 4500 && $scope.totalPoints < 5000) {
                $scope.status4500 = false;
            }

            else if ($scope.totalPoints >= 5000) {
                $scope.status5000 = false;
            }

        };

        $scope.updateBadgeInformation = function () {
            //window.alert('update badge information pressed');
        };

        $scope.updateBadgeNotification = function () {
            if (participantService.getEarnedNewBadge()) {
                //window.alert('yes, set. disabling now');
                participantService.setEarnedNewBadge(false);
                $scope.newBadgeEarned = false;
            }
        }

    })

    .controller('textMessageController',
    function ($scope, $window) {
        init();

        function init() {

            $scope.sampleTextSubject1 = "Welcome to CBB!";
            $scope.sampleTextContent1 = "Over the coming months you will be " +
            "receiving messages with ideas to promote your baby’s development.";
            $scope.sampleTextImage = "../images/BB3_logo_vert_rgb.png";
            $scope.sampleTextVideo1 = "https://www.youtube.com/embed/mN5rIVbUG7M";


            $scope.sampleTextSubject2 = "True or False?";
            $scope.sampleTextContent2 = "Babies are born with all of the " +
            "brain cells they need to learn to talk.";
            $scope.sampleTextImage2 = "../images/BB3_logo_vert_rgb.png";
            $scope.sampleTextVideo2 = "https://www.youtube.com/embed/mN5rIVbUG7M";

            $scope.sampleTextSubject3 = "Quiz Answer";
            $scope.sampleTextContent3 = "Correct! Babies are born with the brain cells they " +
            "need to learn to talk! Talking to your baby strengthens the connections these cells " +
            "need to survive.";
            $scope.sampleTextImage = "../images/BB3_logo_vert_rgb.png";
            $scope.sampleTextVideo3 = "https://www.youtube.com/embed/mN5rIVbUG7M";
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
                    window.alert($scope.currentLanguage);
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

    .controller('logMinutesController',
    function ($scope, $window, $http, $location, participantService) {
        init();

        function init() {

            $scope.participantService = participantService;
            $scope.logNumberOfMinutes = participantService.getLogMinutes();
        }

        $scope.logMinutes = function () {

            participantService.setLogMinutes($scope.logNumberOfMinutes);
            //window.alert('save minutes');

            //send an http request to badges table to update these minutes.

            window.alert('Your minutes have been logged in');
            $location.path("/dashboard");

            //send http request to check the total points from badges.





        }

    })

;