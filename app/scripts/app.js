(function(window, angular, undefined) {
    'use strict';

    /**
     * @ngdoc overview
     * @name angularTranslatorFromJsonApp
     * @description
     * # angularTranslatorFromJsonApp
     *
     * Main module of the application.
     */
    angular
        .module('angularTranslatorFromJsonApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch'
        ])
        .config(function(
            $routeProvider, $locationProvider
        ) {
            if (window.history && window.history.pushState) {
                $locationProvider.html5Mode(true);
            } else {
                // IE9
                $locationProvider.hashPrefix('!');
                //window.location = window.location.href.replace( /#.*/, "");
            }

            $routeProvider
                .when('/', {
                    templateUrl: 'views/translated.html',
                    controller: 'Translated',
                })
                .otherwise({
                    redirectTo: '/'
                });
        })
    ;
})(window, window.angular);