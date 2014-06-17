/*global $, jQuery, document, io, angular*/

// This is a service that will get data from the server and call the controller apis of each
// individual widget. 

var socketServiceModule = angular.module('socket-service', []);

socketServiceModule.factory('socket', function ($rootScope) {
    "use strict";
    var socket = io.connect("http://localhost:1337");
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});