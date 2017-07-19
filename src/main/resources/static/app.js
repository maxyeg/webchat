(function() {
    'use strict';
    var app = angular.module('webchatApp', ['webchatApp.controllers', 'webchatApp.services', 'ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'templates/pages/login.html',
                controller: 'LoginController'
            })
            .when('/register', {
                templateUrl: 'templates/pages/register.html',
                controller: 'RegisterController'
            })
            .when('/main', {
                templateUrl: 'templates/pages/main.html',
                controller: 'SocialController'
            })
            .when('/details', {
                templateUrl: 'templates/pages/contactDetails.html',
                controller: 'ContactDetailsController'
            })
            .otherwise({
                redirectTo: '/main'
            });
    }]);
})();


var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#messages").html("");
}

function connect() {
    var socket = new SockJS('/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/chat/' + $("#name").val(), function (message) {
            showMessage(JSON.parse(message.body));
        });
    });
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/" + $("#sendTo").val(), {}, JSON.stringify({'fromUser': $("#name").val(), 'message': $("#message").val()}));
}

function showMessage(message) {
    $("#messages").append("<tr><td>" + message.fromUser + ":</td><td>" + message.message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});

