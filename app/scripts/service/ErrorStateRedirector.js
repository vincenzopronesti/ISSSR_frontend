'use strict';

mainAngularModule
    .service('ErrorStateRedirector', ['$state','AuthFactory',function ($state,AuthFactory) {
        this.GoToErrorPage = function (errorMsgObject) {
            console.log("going to error page");
            //sleep(10);
            console.log('error state redirector');
            if(errorMsgObject["Messaggio"] === "Login session expired"){

                let r = sessionStorage.getItem('authInfo');
                localStorage.removeItem(AuthFactory.getAuthInfo().username);
                console.log('authinfo removed?: ' + JSON.stringify(r));
                $state.go('login');
            }else{
                console.log("msg is: "+ JSON.stringify(errorMsgObject));
                console.log("value: " + JSON.stringify(Object.keys(errorMsgObject)));
                console.log("value(2): " + JSON.stringify(errorMsgObject["Messaggio"]));
                $state.go('error.details', {errorObject: errorMsgObject});
                // $state.go('login');
            }
        };

    }]);