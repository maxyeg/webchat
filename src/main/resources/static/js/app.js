(function() {
    'use strict';
    var app = angular.module('webchatApp', ['webchatApp.controllers', 'webchatApp.services', 'webchatApp.constants', 'ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'templates/pages/login.html',
                controller: 'LoginController'
            })
            .when('/chat', {
                templateUrl: 'templates/pages/chat.html',
                controller: 'ChatController'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }]);
})();
