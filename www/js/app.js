
'use strict';

/*
* Main BB3 application module
 */
var bb3App = angular.module('bb3', [])
    .constant('BB3Constants',{
        // debugging flag
        debug: true
    })
    .config(['$routeProvider', function($routeProvider) {
        /*
        * Main route provider for the study design tab
         */
        $routeProvider


            .when('/favorites',
            {templateUrl: 'pages/favorites.html', controller: 'contactInfoController'}
        )

            .when('/dashboard',
            {templateUrl: 'pages/dashboard.html', controller: 'stateController' }
        )
            .when('/home',
            {templateUrl: 'partials/home.html'}
        )
            .when('/login',
            {templateUrl: 'partials/loginView.html', controller: 'participantsController' }
        )
            .when('/signUp',
            {templateUrl: 'partials/signUpView.html', controller: 'participantsController' }
        )
            .when('/home',
            {templateUrl: 'partials/home.html'}
        )
            .when('/facebook',
            {templateUrl: 'partials/facebookView.html', controller: 'solutionTypeController' }
        )
            .when('/youtube',
            {templateUrl: 'partials/youtubeView.html', controller: 'participantsController' }
        )
            .when('/text',
            {templateUrl: 'partials/textView.html', controller: 'contactInfoController' }
        )
            .when('/tutorial',
            {templateUrl: 'partials/tutorialView.html', controller: 'predictorsController' }
        )
            .when('/aboutUs',
            {templateUrl: 'partials/aboutUsView.html', controller: 'covariatesController' }
        )

            // contact us screens
            .when('/feedback',
            {templateUrl: 'partials/feedbackView.html', controller: 'feedbackController' }

        )

            .when('/contactInfo',
            {templateUrl: 'partials/contactInfoView.html', controller: 'contactInfoController' }

        )
            .when('/spanish/login',
            {templateUrl: 'partials/spanish/loginView.html', controller: 'participantsSpanishController' }
        )
            .when('/spanish/signUp',
            {templateUrl: 'partials/spanish/signUpView.html', controller: 'participantsSpanishController' }
        )
            .when('/spanish/home',
            {templateUrl: 'partials/spanish/home.html'}
        )
            .when('/spanish/facebook',
            {templateUrl: 'partials/spanish/facebookView.html', controller: 'solutionTypeController' }
        )
            .when('/spanish/youtube',
            {templateUrl: 'partials/spanish/youtubeView.html', controller: 'nominalPowerController' }
        )
            .when('/spanish/text',
            {templateUrl: 'partials/spanish/textView.html', controller: 'contactInfoSpanishController' }
        )
            .when('/spanish/tutorial',
            {templateUrl: 'partials/spanish/tutorialView.html', controller: 'predictorsController' }
        )
            .when('/spanish/aboutUs',
            {templateUrl: 'partials/spanish/aboutUsView.html', controller: 'covariatesController' }
        )

            // contact us screens
            .when('/spanish/feedback',
            {templateUrl: 'partials/spanish/feedbackView.html', controller: 'feedbackController' }

        )

            .when('/spanish/contactInfo',
            {templateUrl: 'partials/spanish/contactInfoView.html', controller: 'contactInfoController' }

        )

            .otherwise({ redirectTo: '/' });
    }]);



