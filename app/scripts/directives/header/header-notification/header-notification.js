'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
mainAngularModule
    .directive('headerNotification', ['AuthFactory', function (AuthFactory) {
        return {
            templateUrl: 'scripts/directives/header/header-notification/header-notification.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function ($scope) {

                $scope.currentUser = AuthFactory.getAuthInfo();

                $scope.selectedMenu = 'dashboard';
                $scope.Logout = LogoutFn;

                function LogoutFn() {
                    sessionStorage.removeItem('authInfo');
                    localStorage.removeItem(AuthFactory.getAuthInfo().username);
                    let r = sessionStorage.getItem('authInfo');

                    AuthFactory.deleteAuthInfo();
                }
            }
        };
    }]);