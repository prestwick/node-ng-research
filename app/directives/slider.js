/*global $, jQuery, document, io, angular*/

angular.module('slider-directive', [])
    .directive('lvSlider', function (socket) {
        "use strict";
        return {
            scope: {},
            controller: function ($scope, $element) {
                var i,
                    createChangeEvent = function (sliderSelector, sliderTipSelector) {
                        return sliderSelector.on('change', function (event) {
                            var value = event.args.value;
                            //sliderTipSelector.text(value);
                            $scope.sliderTipVal = value; //TODO: figure out why this doesn't work
                            $scope.$apply();
                        });
                    },
                    createSlideEndEvent = function (selector) {
                        return selector.on('slideEnd', function (event) {
                            var value = event.args.value;
                            socket.emit('runtime-data-direction-b', {rate: value});
                        });
                    };
                
                $scope.domIdRegistry = {};
                $scope.sliderTipVal = 1000;
                socket.on('init', function (widgetIdRegistry) {
                    if (widgetIdRegistry.sliderType) {
                        for (i = 0; i < widgetIdRegistry.sliderType.length; i += 1) {
                            var id = widgetIdRegistry.sliderType[i],
                                tipId = id + 'TipVal';
                            
                            $scope.domIdRegistry[id] = $('#' + id);
                            $scope.domIdRegistry[tipId] = $('#' + tipId);
                            
                            $scope.domIdRegistry[id].jqxSlider({ min: 0, max: 1000, ticksFrequency: 100, value: 1000, step: 5});
                            createChangeEvent($scope.domIdRegistry[id], $scope.domIdRegistry[tipId]);
                            createSlideEndEvent($scope.domIdRegistry[id]);
                        }
                    }
                });
            }
        };
    });