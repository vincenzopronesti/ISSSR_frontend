'use strict';
// Eseguito subito dopo app.config()
mainAngularModule.run(['$rootScope','$state','jwtHelper', 'DEBUG', 'authManager', 'DTDefaultOptions', 'AclService', 'ErrorStateRedirector', '$transitions', 'AuthFactory', 'storageService','AclProtector',
    function ($rootScope,$state,jwtHelper, DEBUG, authManager, DTDefaultOptions, AclService, ErrorStateRedirector, $transitions, AuthFactory, storageService,AclProtector) {

        var aclData = {};
        var oldState = null;

        //get permission json from backend, setting security restriction in sessionStorage
        AuthFactory.getPermission(function(response){
            aclData = JSON.parse(JSON.stringify(response.data));
            console.log(aclData);
            AclService.setAbilities(aclData.roles);
            storageService.save('routes', JSON.stringify(aclData.routes));
            storageService.save('simbolicPermissions', JSON.stringify(aclData.simbolicPermissions));
            storageService.save('sidebar', JSON.stringify(aclData.sidebar));
        }, function (response) {
            ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore server"});
        });



        //AclService.setAbilities(aclData);
        // $rootScope.hasPermission = AclService.can;
        $rootScope.hasPermission = AclProtector.hasPermissionSimbolic; //to check symbolic permissions inside DOM by json retrieved
        $rootScope.hasPermissionDirect = AclProtector.can; //to direct permission evaluation


        $rootScope.isDebug = DEBUG;
        console.info('isDebug: ' + $rootScope.isDebug);

        $transitions.onError({}, ($transition$) => {
            var toStateName = $transition$.to().name;
            var fromStateName = $transition$.from().name;


            if (toStateName !== fromStateName) {

                let Msg = "Rotta non autorizzata";
                if (DEBUG) {
                    Msg += ": " + toStateName;
                }
                oldState = fromStateName;
                let expToken = null;
                let exp = JSON.parse(sessionStorage.getItem('authInfo'));
                if(exp !== null) {
                    expToken = exp.jwtToken;
                    if (expToken !== null && jwtHelper.isTokenExpired(expToken)) {
                        Msg = 'Login session expired';
                    }
                }

                ErrorStateRedirector.GoToErrorPage({Messaggio: Msg});
            }
        });

        authManager.checkAuthOnRefresh();
        authManager.redirectWhenUnauthenticated();

        DTDefaultOptions.setLanguageSource('//cdn.datatables.net/plug-ins/1.10.9/i18n/Italian.json');

    }]);