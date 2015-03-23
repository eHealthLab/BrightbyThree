

/**
 * Controller which manages the completion state of the navbar
 */

//var bb3App = angular.module('bb3', []);

bb3App.controller('stateController',
    function($scope, $rootScope, $window, $http, $location, participantService) {

        /**
         * Initialize the controller
         */
        init();
        function init() {

            $scope.participantService = participantService;
            $scope.loginStatus = false;
            $scope.currentLanguage = "English";
            $scope.loginMinutesEnabled = false;
            $scope.badgesEnabled = false;
            $scope.goalsEnabled = false;
            $scope.networkStatsEnabled = false;
            $scope.goalshaveBeenSet = 0;

            $scope.goalsDaysPerWeek = participantService.getGoalsDays();
            $scope.goalsMinutesPerDay = participantService.getGoalsMinutes();

            $scope.newBadgeEarned = participantService.getEarnedNewBadge();

            $scope.userID = participantService.getUserID();
        }

        $scope.getLoginStatus = function() {
            return participantService.getLoginStatus();
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
                participantService.globalLoginStatus = false;
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
    function ($scope, $window, $http, $location, $element, participantService) {
        init();
        function init() {

            $scope.participantService = participantService;
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

        $scope.getLoginStatus = function () {
            return participantService.getLoginStatus();
        };

        $scope.logout = function () {
            if (confirm('Are you sure you want to logout?')) {
                participantService.globalLoginStatus = false;
            }
        };

        $scope.getBabyName = function() {
            $scope.newParticipant.babyName = "notDefault";
            return $scope.newParticipant.babyName;
        };

        $scope.submitSignupInfo = function() {
            var email = $scope.newParticipant.emailID.toUpperCase();

            var newDOB =  '2014-06-06'; //$scope.formatDate($scope.newParticipant.babyDOB);
            // '2014-06-06';

            if($scope.newParticipant.password1 != $scope.newParticipant.password2) {
                //$scope.signUpErrorNotification = "Passwords do not match. Correct them and try again.";
                window.alert('Passwords do not match. Correct them and try again.');
            }

            else {

                $http({method: 'POST',
                    url: 'htt/loginSignup/' +
                    $scope.newParticipant.firstName + '/' +
                    $scope.newParticipant.lastName + '/' +
                    email + '/' +
                    $scope.newParticipant.password1 + '/' +
                    $scope.newParticipant.phoneNumber + '/'
                    +
                    $scope.newParticipant.babyName + '/' +
                    newDOB + '/' +
                    $scope.newParticipant.babyGender + '/' +
                    $scope.newParticipant.zipcode
                }).
                success(function(data, status, headers, config) {

                    $scope.appsData = data;
                        //window.alert($scope.appsData);
                    if($scope.appsData != undefined) {
                        $scope.login = true;
                        window.alert("You have successfully signed up.");
                        window.alert("id is + " + $scope.appsData.userId);
                        participantService.setUserID($scope.appsData.userId);

                        participantService.globalLoginStatus = true;

                        participantService.setNextBadgeToEarn(1);
                        participantService.setPointsToEarnNextBadge(150);
                        participantService.setTotalPointsEarned(0);
                        var userID = $scope.appsData.userId;

                        $scope.newParticipant.firstName = "";
                        $scope.newParticipant.lastName = "";
                        $scope.newParticipant.emailID = "";
                        $scope.newParticipant.password1 = "";
                        $scope.newParticipant.password2 = "";
                        $scope.newParticipant.phoneNumber = "";
                        $scope.newParticipant.babyName = "";
                        $scope.newParticipant.babyGender = "";
                        $scope.newParticipant.babyDOB = "";
                        $scope.newParticipant.zipcode = "";

                            $http({method: 'POST',
                                url: 'http://localhost:3000/initialize/' + userID
                                //url: 'http://mothersmilk.ucdenver.edu:3000/feedback/' +

                            }).
                            success(function(data, status, headers, config) {
                                $scope.appsData = data;
                                if(data == "Success") {
                                    ;
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

                            //$location.path("/dashboard");

                    }
                    else {
                        window.alert("Email ID exists. Use a different Email ID.");
                    }
                }).
                error(function(data, status, headers, config) {
                    window.alert("Unable to contact server. Please try again later.");
                });
            }

        };

        $scope.formatDate = function(date){
            //window.alert("date in: " + date);
            var dateIn = date.split("-").join("/");
            var dateOut = new Date(dateIn);
            //window.alert("date out: " + dateOut);
            return dateOut;
        };

        $scope.submitLoginInfo = function() {


            //window.alert('inside login in button pressed');
            var email = $scope.emailID.toUpperCase();

                $http.get('http://localhost:3000/loginSignup/' + email + '/' + $scope.password1).
                    success(function (data, status, headers, config) {

                        $scope.appsData = data;

                        if ($scope.appsData != "false") {

                            $scope.login = true;
                            participantService.globalLoginStatus = true;
                            $scope.loginStatus = participantService.globalLoginStatus;
                            participantService.setUserID(data[0].ID);

                            $scope.emailID = "";
                            $scope.password1 = "";

                            var id = data[0].ID; // participantService.getUserID();
                            window.alert('id: '+ id);

                            $scope.getBadgeInformation(id);
                            $scope.getGoalsInfo(id);
                            $scope.getEarnedPointsInfo(id);

                            $location.path("/");

                        }
                        else {
                            $scope.loginErrorNotification = "check the info and login again.";
                            window.alert('Check the login information and try again.');
                        }
                    }).
                    error(function (data, status, headers, config) {
                        //window.alert("sorry, error");
                        window.alert("Unable to contact server. Please try again later.");
                    });
        };

        $scope.getBadgeInformation = function (userID) {

            $http.get('http://localhost:3000/badgeInfo/' + userID).
                success(function (data, status, headers, config) {
                    //window.alert('success');
                    $scope.appsData = data;
                    if ($scope.appsData.status == "success") {
                        var badge = $scope.appsData.badgeToEarn;
                        participantService.setNextBadgeToEarn(badge);
                        $location.path("/dashboard");
                    }
                    else
                        window.alert("unsuccessful");
                }).
                error(function (data, status, headers, config) {
                    window.alert("Unable to contact server. Please try again later.");
                });
        };


        $scope.getGoalsInfo = function (userID) {

            $http.get('http://localhost:3000/goalsInfo/' + userID).
                success(function (data, status, headers, config) {

                    $scope.appsData = data;
                    if ($scope.appsData.status == "success") {
                        var goals = $scope.appsData.goals;
                        participantService.setGoalsDays(goals.daysPerWeek);
                        participantService.setGoalsMinutes(goals.minutesPerDay);
                    }
                    else {
                        $window.alert('unsuccessful');
                    }
                }).
                error(function (data, status, headers, config) {
                    window.alert("Unable to contact server. Please try again later.");
                });
        };

        $scope.getEarnedPointsInfo = function (userID) {

            $http.get('http://localhost:3000/totalPointsInfo/' + userID).
                success(function (data, status, headers, config) {
                    //$window.alert("values: " + email + $scope.password1);
                    $scope.appsData = data;
                    if ($scope.appsData.status == "success") {
                        participantService.setTotalPointsEarned($scope.appsData.totalPoints);
                    }
                    else {
                        $window.alert('unsuccessful');
                    }
                }).
                error(function (data, status, headers, config) {
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
            $scope.updateStatus = false;

            $scope.goals =
            {
                daysPerWeek: 2,
                minutesPerDay: 10
            }
        }

        $scope.getGoalsInfo = function () {

            $scope.goals.daysPerWeek = participantService.getGoalsDays();
            $scope.goals.minutesPerDay = participantService.getGoalsMinutes();
            //window.alert("Goals: " + $scope.goals.daysPerWeek + ' ' +
            //$scope.goals.minutesPerDay);

        };

        $scope.getStatus = function () {
            return $scope.updateStatus;
        };

        $scope.setGoals = function () {

            window.alert('inside goals controller');

            var id = participantService.userID;

            window.alert('id: ' + participantService.userID);

            if (id == undefined) {
                ;
            }
            else {



            $http({method: 'POST',
                url: 'http://localhost:3000/setGoals/' +
                $scope.goals.daysPerWeek + '/' + $scope.goals.minutesPerDay + '/' + id
            }).
                success(function (data, status, headers, config) {
                    $scope.updateStatus = true;
                    window.alert('Your goals have been set to ' +
                    $scope.goals.daysPerWeek + ' days per week and '
                    + $scope.goals.minutesPerDay + ' minutes per day');

                }).
                error(function (data, status, headers, config) {
                    //window.alert("sorry, error");
                    window.alert("Unable to contact server. Please try again later.");
                });

            participantService.goalsDaysPerWeek =
                $scope.goals.daysPerWeek;
            participantService.goalsMinutesPerDay =
                $scope.goals.minutesPerDay;

            //window.alert('goals have been set to: ' + participantService.getGoalsDays()
            //+ ' ' + participantService.getGoalsMinutes());

            if ($scope.goals.daysPerWeek != 2
                || $scope.goals.minutesPerDay != 10) {
                $scope.reset = true;
            }
            else
                $scope.reset = false;
            //$location.path("/dashboard");

            }

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
                    //window.alert(participantService.goalsDaysPerWeek
                    //+ " " + participantService.goalsMinutesPerDay);

            }

            else {
                $scope.reset = false;
                }
                // send a http request for this purpose. to udpate the table.
            }
        }

    })


    .controller('badgesController',
    function ($scope, $window, $http, participantService) {
        init();

        function init() {

            $scope.participantService = participantService;
            $scope.totalPoints = 800; // participantService.getTotalPointsEarned();
            $scope.participantID = participantService.getUserID();
            $scope.nextBadgeToEarn = 1; //participantService.getNextBadgeToEarn();
            // reload the status for each badge
            $scope.statusBadge = participantService.statusBadge;


            if ($scope.nextBadgeToEarn < 2) {
                $scope.newUser = true;
            }
            else {
                $scope.newUser = false;

                for (var i=0; i < $scope.nextBadgeToEarn; i++) {
                    //if ($scope.totalPoints >= $scope.statusBadge[i][0]) {
                        $scope.statusBadge[i][1] = true;

                        //if ($scope.totalPoints < $scope.statusBadge[i + 1][0]) {
                          //  $scope.statusBadge[i + 1][1] = true;
                            //break;
                       // }
                   // }
                }
            }

            // reload points to earn next badge
            $scope.pointsToEarnNextBadge = 120;
            //participantService.getPointsToEarnNextBadge();

            // calculate the percent achieved
            var number = $scope.statusBadge[$scope.nextBadgeToEarn][0];
            $scope.progressBarValue = (1 - $scope.pointsToEarnNextBadge/number) * 100;

            $scope.nextBadgeToEarn = participantService.getNextBadgeToEarn();

        }

        $scope.updateBadgeInformation = function () {

            $http({method: 'POST',
                url: 'http://localhost:3000/updateBadge/' +
                participantService.nextBadgeToEarn +
                '/' + 2 //participantService.userID
            }).
                success(function (data, status, headers, config) {

                    $scope.appsData = data;
                    //window.alert("login data:" + data[0].email);
                    if (data == "Success") {
                        //window.alert('request successful');
                        //window.alert('Your badge has been set to ' +
                        //participantService.nextBadgeToEarn);
                        //$location.path("/dashboard");
                    }
                    else {
                        ;//$scope.loginErrorNotification = "check the info and login again.";
                        //window.alert('Check the login information and try again.');
                    }
                }).
                error(function (data, status, headers, config) {
                    //window.alert("sorry, error");
                    //window.alert("Unable to contact server. Please try again later.");
                });

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
    function ($scope, $window, participantService) {
        init();

        function init() {

            $scope.participantService = participantService;

            participantService.AddFavoriteTextMessageID(1);
            participantService.AddFavoriteTextMessageID(3);
            participantService.AddFavoriteTextMessageID(5);

            $scope.sampleTextSubject1 = "Welcome";
            $scope.sampleTextContent1 = "Welcome to CBB! Over the coming months you will be " +
            "receiving messages with ideas to promote your baby’s development.";
            $scope.sampleTextImage = "../images/BB3_logo_vert_rgb.png";
            $scope.sampleTextVideo1 = "https://www.youtube.com/embed/mN5rIVbUG7M";
            $scope.inbound1 = false;


            $scope.sampleTextSubject2 = "Best Teacher";
            $scope.sampleTextContent2 = "True or False? 80% of a baby's brain development will " +
            "occur in the first 3 years of life";
            $scope.sampleTextImage2 = "../images/BB3_logo_vert_rgb.png";
            //$scope.sampleTextVideo2 = "https://www.youtube.com/embed/mN5rIVbUG7M";
            $scope.inbound2 = true;

            $scope.sampleTextSubject3 = "Quiz Answer";
            $scope.sampleTextContent3 = "Correct! Most of baby's brain development will" +
            "occur during the early years of life. This is why it is so important to engage " +
            "in talking, reading, playing, and encouragement right now!";
            $scope.sampleTextImage = "../images/BB3_logo_vert_rgb.png";
            //$scope.sampleTextVideo3 = "https://www.youtube.com/embed/mN5rIVbUG7M";
            $scope.inbound3 = false;
        }


        $scope.addToFavoritesPressed = function(){
            window.alert('add to favorites pressed');
            window.alert(participantService.getFavoriteTextMessagesIDsArray());
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
            $scope.feedbackStatus = false;
        }

        $scope.sendFeedback = function() {
            var userID = 2; // participantService.getUserID();
            if ($scope.feedbackText != undefined) {
                if (userID == undefined) {
                    ;
                }
                else {
                    $http({
                        method: 'POST',
                        url: 'http://localhost:3000/feedback/' + userID + '/' + $scope.feedbackText
                    }).
                    success(function (data, status, headers, config) {

                        $scope.feedbackStatus = true;
                        $scope.feedbackText = "";
                        $scope.appsData = data;
                        if (data == "Success") {
                            window.alert("Thank You! Your feedback has been submitted.");
                            //$location.path("/dashboard");
                            if ($scope.currentLanguage == "English") {
                                window.alert("Thank You! Your feedback has been submitted.");
                                //$location.path("../pages/settings.html");
                            }
                            else if ($scope.currentLanguage == "Español") {
                                window.alert("¡Gracias! Sus comentarios fueron entregados.");
                                //$location.path("/dashboard");
                            }
                        }
                    }).
                    error(function (data, status, headers, config) {
                        if ($scope.currentLanguage == "English") {
                            window.alert("Unable to contact server. Please try again later.");
                        }
                        else if ($scope.currentLanguage == "Español") {
                            window.alert("No puede comunicarse con el servidor. Por favor de intentarlo más tarde. ");
                        }


                    });
                    //window.alert($scope.currentLanguage);
                    if ($scope.currentLanguage == "English") {
                        window.alert("Please login first.");
                        $location.path("/login");
                    }
                    else if ($scope.currentLanguage == "Español") {
                        window.alert("Por favor de hacer login primero.");
                        $location.path("/spanish/login");
                    }
                } // end user id is !undefined
            } // end feedback is !undefined
        } // end sendFeedback function

    })

    .controller('logMinutesController',
    function ($scope, $window, $http, $location, participantService) {
        init();

        function init() {
            $scope.participantService = participantService;
            $scope.logNumberOfMinutes = participantService.getLogMinutes();
            $scope.totalPointsEarnedSoFar = participantService.getTotalPointsEarned();
            $scope.minutesUpdated = false;
            $scope.nextBadgeToEarn = participantService.getNextBadgeToEarn();

        }

        $scope.getStatus = function () {
            return $scope.minutesUpdated;
        };

        $scope.logMinutes = function () {

            participantService.setLogMinutes($scope.logNumberOfMinutes);

            var userID = 2;// participantService.getUserID();
            var minutes = $scope.logNumberOfMinutes;
            if (userID == undefined) {
                    ;
            }
            else {
                    $http({method: 'POST',
                        url: 'http://localhost:3000/logMinutes/' + minutes
                        + '/' + userID
                    }).
                    success(function(data, status, headers, config) {

                        $scope.minutesUpdated = true;
                        $scope.logNumberOfMinutes = "";
                        $scope.appsData = data;

                        window.alert("Great! Your minutes have been logged in!");

                        var points = participantService.getTotalPointsEarned()
                            + minutes;

                        participantService.setTotalPointsEarned(points);

                        $scope.nextBadgeToEarn = 1; //participantService.getNextBadgeToEarn();
                        $scope.statusBadge = participantService.statusBadge;

                        window.alert('next badge to earn: ' + $scope.nextBadgeToEarn +
                        'total points so far:' + points + 'statusBadge[$scope.nextBadgeToEarn][0]'
                        + $scope.statusBadge[$scope.nextBadgeToEarn][0]);
                        if (points >= $scope.statusBadge[$scope.nextBadgeToEarn][0]) {
                            statusBadge[$scope.nextBadgeToEarn][1] = true;
                            participantService.statusBadge[$scope.nextBadgeToEarn][1] = true;
                            window.alert('Congratulations! You just earned a new badge.');
                            participantServiceInstance.setNextBadgeToEarn($scope.nextBadgeToEarn+1);

                            $http({method: 'POST',
                                url: 'http://localhost:3000/updateBadge/' +
                                participantService.nextBadgeToEarn +
                                '/' + 2 //participantService.userID
                            }).
                            success(function (data, status, headers, config) {
                                $scope.appsData = data;
                                if (data == "Success") {
                                }
                                else {
                                    ;
                                }
                            }).
                            error(function (data, status, headers, config) {
                                    window.alert("Unable to contact server. Please try again later.");
                            });
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
            }
        }
    })

    .controller('networkController',
    function ($scope, $window, $http, $location, participantService) {
        init();

        function init() {

            $scope.participantService = participantService;
            $scope.totalWeeklyMinutes = participantService.getWeeklyMinutes();
            $scope.totalMonthlyMinutes = participantService.getMonthlyMinutes();
        }

        $scope.updateMinutesInNetwork = function () {

            var userID = participantService.getUserID();

            //send an http request to badges table to update these minutes.

            //window.alert('Your minutes have been logged in');
            //$location.path("/dashboard");

            //send http request to check the total points, weekly, and monthly
            // points.

            var numberOfDaysEnrolled = participantService.getDaysEnrolled();

            if (numberOfDaysEnrolled < 7) {
                $scope.totalWeeklyMinutes = undefined;
                participantService.setWeeklyMinutes(undefined);

                $scope.totalMonthlyMinutes = undefined;
                participantService.setMonthlyMinutes(undefined);
            }

            $http({method: 'POST',
                url: 'http://localhost:3000/logMinutes/' + $scope.logNumberOfMinutes
                + '/' + userID
                //url: 'http://mothersmilk.ucdenver.edu:3000/feedback/' +

            }).
                success(function(data, status, headers, config) {
                    $scope.appsData = data;
                    if(data == "Success") {
                        //if ($scope.currentLanguage == "English") {
                        window.alert("Your minutes have been logged in.");
                        var points = participantService.getTotalPointsEarned() + $scope.logNumberOfMinutes;
                        participantService.setTotalPointsEarned(points);
                        //$location.path("../pages/settings.html");
                        //}
                        //else if ($scope.currentLanguage == "Español") {
                        //window.alert("¡Gracias! Sus comentarios fueron entregados.");
                        $location.path("../pages/settings.html");
                        //}
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
        }

    })

;