/*global $, jQuery, document, io, angular, console*/

angular.module('gauge-directive', ['socket-service', 'dom-id-service'])
    .directive('lvGauge', function (socket) { //TODO: remove these parameters
        "use strict";
        return {
            scope: {},
            controller: function ($scope, $element) {
                var i;
                $scope.domIdRegistry = {};
                socket.on('init', function (widgetIdRegistry) {
                    if (widgetIdRegistry.gaugeType) {
                        for (i = 0; i < widgetIdRegistry.gaugeType.length; i += 1) {
                            var id = widgetIdRegistry.gaugeType[i];
                            $scope.domIdRegistry[id] = $('#' + widgetIdRegistry.gaugeType[i]);
                            $scope.domIdRegistry[id].jqxGauge({
                                ranges: [{ startValue: 0, endValue: 55, style: { fill: '#4bb648', stroke: '#4bb648' }, endWidth: 5, startWidth: 1 },
                                         { startValue: 55, endValue: 110, style: { fill: '#fbd109', stroke: '#fbd109' }, endWidth: 10, startWidth: 5 },
                                         { startValue: 110, endValue: 165, style: { fill: '#ff8000', stroke: '#ff8000' }, endWidth: 13, startWidth: 10 },
                                         { startValue: 165, endValue: 220, style: { fill: '#e02629', stroke: '#e02629' }, endWidth: 16, startWidth: 13 }],
                                ticksMinor: { interval: 5, size: '5%' },
                                ticksMajor: { interval: 10, size: '9%' },
                                value: 0,
                                colorScheme: 'scheme05',
                                animationDuration: 100
                            });
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
