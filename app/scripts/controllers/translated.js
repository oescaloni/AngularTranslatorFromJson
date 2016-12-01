(function(window, angular, undefined) {
    'use strict';

    angular
        .module('angularTranslatorFromJsonApp')
        .controller('Translated', function(
            $scope,
            translator
        ) {
            function setTranslations() {
                if (!translator.trans) {
                    translator.getTranslations.then(function(response) {
                        $scope.trans = response;
                    });
                } else {
                    $scope.trans = translator.trans;
                }
            }

            function init() {
                setTranslations();
            }

            init();
        })
    ;
})(window, window.angular);