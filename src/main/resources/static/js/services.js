(function () {
    'use strict';
    angular.module('webchatApp.services', ['webchatApp.constants'])
        .factory('ChatService', ['$q', 'CONSTANTS', function ($q, CONSTANTS) {

            var stompClient = null;

            return {
                connect: function (name, $rootScope) {
                    var deferred = $q.defer();

                    var socket = new SockJS('/websocket');
                    stompClient = Stomp.over(socket);
                    stompClient.connect({}, function (frame) {
                        console.log('Connected: ' + frame);
                        stompClient.subscribe('/topic/chat/' + name, function (message) {
                            $rootScope.$broadcast(CONSTANTS.EVENTS.NEW_MESSAGE, JSON.parse(message.body));
                        });
                        deferred.resolve(frame);
                    }, function (error) {
                        deferred.reject(error);
                    });

                    return deferred.promise;
                },
                disconnect: function () {
                    if (stompClient != null) {
                        stompClient.disconnect();
                    }
                    console.log("Disconnected");
                },
                sendMessage: function (fromUser, toUser, message, timestamp) {
                    stompClient.send("/app/" + toUser, {}, JSON.stringify({
                        'fromUser': fromUser,
                        'message': message,
                        'timestamp': timestamp
                    }));
                }
            };
        }]);
})();
