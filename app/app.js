/*global angular, console*/

var app = angular.module('app', ['gauge-directive', 'numeric-input-directive', 'slider-directive', 'socket-service', 'dom-id-service']);

app.controller('AppCtrl', ['$scope', '$rootScope', 'socket', function ($scope, $rootScope, socket) {
    "use strict";
    var i;
    $rootScope.domIdRegistry = {};
    socket.on('runtime-data-direction-a', function (o) {
        for (i = 0; i < o.length; i += 1) {
            $rootScope.domIdRegistry[o[i].id].val(o[i].value);
        }
    });
}]);