/*global $, jQuery, document, io, angular*/

angular.module('numeric-input-directive', [])
    .directive('lvNumericinput', function (socket) {
        "use strict";
        return {
            scope: {},
            controller: function ($scope, $element) {
                var i;
                $scope.domIdRegistry = {};
                socket.on('init', function (widgetIdRegistry) {
                    if (widgetIdRegistry.numericType) {
                        for (i = 0; i < widgetIdRegistry.numericType.length; i += 1) {
                            var id = widgetIdRegistry.numericType[i];
                            $scope.domIdRegistry[id] = $('#' + widgetIdRegistry.numericType[i]);
                            $scope.domIdRegistry[id].jqxNumberInput({ width: '250px', height: '25px',  spinButtons: true});
                        }
                    }
                });
                socket.on('runtime-data-direction-a', function (o) {
                    for (i = 0; i < o.length; i += 1) {
                        if ($scope.domIdRegistry[o[i].id]) {
                            $scope.domIdRegistry[o[i].id].val(o[i].value);
                        }
                    }
                });
            }
        };
    });