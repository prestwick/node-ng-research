/*global $, jQuery, document, io, angular, console*/

angular.module('gauge-directive', [])
    .directive('lvGauge', function ($rootScope, socket) {
        "use strict";
        return {
            link: function ($scope, $element, attributes) {
                $rootScope.domIdRegistry[attributes.id] = $element;
                $element.jqxGauge({
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
        };

    });
