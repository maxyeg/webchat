(function () {
    'use strict';
    angular.module('webchatApp.constants', []).factory('CONSTANTS', function () {
        return {
            EVENTS: {
                NEW_MESSAGE: 'NEW_MESSAGE'
            }
        };
    });
})();
