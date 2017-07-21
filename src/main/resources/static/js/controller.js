(function () {
    'use strict';
    angular.module('webchatApp.controllers', ['webchatApp.services', 'webchatApp.constants'])
        .controller('LoginController', ['$rootScope', '$scope', '$location', '$window', 'ChatService',
            function ($rootScope, $scope, $location, $window, ChatService) {
                $scope.login = function (name) {
                    ChatService.connect(name, $rootScope).then(function () {
                        $window.onbeforeunload = ChatService.disconnect;
                        $location.path('/chat').search({name: name});
                    }).catch(function (response) {
                        //request was not successful
                        //handle the error
                    });
                };
            }])

        .controller('ChatController', ['$scope', '$location', 'CONSTANTS', 'ChatService',
            function ($scope, $location, CONSTANTS, ChatService) {
                $scope.messages = $scope.messages || [];
                $scope.name = $location.search().name;
                $scope.sendMessage = function (toUser, message) {
                    ChatService.sendMessage($scope.name, toUser, message);
                    $scope.messages.push({'fromUser': $scope.name, 'message': message});
                };
                $scope.$on(CONSTANTS.EVENTS.NEW_MESSAGE, function (event, args) {
                    $scope.messages.push(args);
                    $scope.$apply();
                });
                $scope.reply = function (receiver) {
                    $scope.toUser = receiver;
                    $scope.message = '';
                };
            }]);
})();
