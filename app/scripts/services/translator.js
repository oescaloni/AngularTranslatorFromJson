(function() {
    'use strict';

    angular
        .module('angularTranslatorFromJsonApp')
        .service('translator', function(
            $http, $q
        ) {
            var translator = this;

            var language = navigator.language;
            var defaultLanguage = 'en';

            var trans = {};

            trans[defaultLanguage] = {};
            trans[language] = {};

            function getJsonFile(language) {
                var deferred = $q.defer();

                $http
                    .get('/translations/' + defaultLanguage + '.json')
                    .success(function(response) {
                        trans[defaultLanguage] = response;
                    })
                    .finally(function() {
                        $http
                            .get('/translations/' + language + '.json')
                            .success(function(response) {
                                trans[language] = response;
                            })
                            .finally(function() {
                                refillLanguageWithDefault(language);
                                deferred.resolve(trans[language]);
                            })
                        ;
                    })
                ;

                return deferred.promise;
            }

            function refillLanguageWithDefault(language) {
                var key;

                for (key in trans[defaultLanguage]) {
                    if (!trans[language][key]) {
                        trans[language][key] = trans[defaultLanguage][key];
                    }
                }

                translator.trans = trans[language];

                return trans[language];
            }

            function getTranslations() {
                return getJsonFile(language);
            }

            function init() {
                translator.getTranslations = getTranslations();
            }

            init();
        })
    ;
})();