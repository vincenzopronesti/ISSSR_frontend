'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */

mainAngularModule
    .factory('UserDataFactory', ['$http', 'BACKEND_BASE_URL', 'USER_ENDPOINT_URL', 'ToasterNotifierHandler',
        function ($http, BACKEND_BASE_URL, USER_ENDPOINT_URL, ToasterNotifierHandler) {
            let thisCrudService = {};
            thisCrudService.user = {};
            let _endPointJSON = BACKEND_BASE_URL + USER_ENDPOINT_URL;


            thisCrudService.GetAll = GetAllFn;
            thisCrudService.GetAllNotCustomer = GetAllNotCustomerFn;
            thisCrudService.GetSingle = GetSingleFn;
            thisCrudService.Insert = InsertFn;
            thisCrudService.Update = UpdateFn;
            thisCrudService.Remove = RemoveFn;
            thisCrudService.GetGroupByUserID = GetGroupByUserIDFn;
            thisCrudService.metadata = getMetadata;
            thisCrudService.GetSelf = GetSelf;

            thisCrudService.user = null;

            function GetAllNotCustomerFn(successCB, errorCB) {

                console.log(_endPointJSON + 'not_customer')
                $http({
                    method: 'GET',
                    url: _endPointJSON + 'not_customer'
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            function getMetadata(success, error) {

                $http({
                    method: 'GET',
                    url: _endPointJSON + "metadata"
                })
                    .then(function (response) {
                            success(response);
                        },
                        function (response) {
                            if (error) {
                                error(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        })
            }

            // get all data from database
            function GetAllFn(successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: _endPointJSON
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            function GetSingleFn(id, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: _endPointJSON + id
                    //url: '/ticketingsystem/users.info'
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }


            function GetSelf(successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: _endPointJSON + "self"
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            // get info user
            function GetGroupByUserIDFn(id, successCB, errorCB) {
                let ep = _endPointJSON + id + '/groups/';
                console.log(ep);
                $http({
                    method: 'GET',
                    url: ep
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            // post the data from database
            function InsertFn(user, successCB, errorCB) {
                console.log("insertFN", user);
                $http({
                    method: 'POST',
                    url: _endPointJSON,
                    data: user
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                                ToasterNotifierHandler.handleCreation(response);

                                $http({
                                    method: 'GET',
                                    url: _endPointJSON + 'getMaxId'
                                })

                                    .then(function (response) {

                                            if (successCB) {
                                                successCB(response.data);
                                                ToasterNotifierHandler.handleCreation(response);

                                                $http({
                                                    method: 'POST',
                                                    url: _endPointJSON + 'insertUserInGroup/' + response.data + '/' + user.role,
                                                })
                                                    .then(function (response) {

                                                            if (successCB) {
                                                                successCB(response.data);
                                                                ToasterNotifierHandler.handleCreation(response);
                                                            }
                                                        },
                                                        function (response) {
                                                            if (errorCB) {
                                                                errorCB(response.data);
                                                            }
                                                            console.error(response.data);
                                                            ToasterNotifierHandler.handleError(response);
                                                        });
                                            }
                                        },
                                        function (response) {
                                            if (errorCB) {
                                                errorCB(response.data);
                                            }
                                            console.error(response.data);
                                            ToasterNotifierHandler.handleError(response);
                                        });
                            }
                        },
                        function (response) {
                            if (response.status === 409) {
                                ToasterNotifierHandler.showErrorToast('Username specificato già esistente');
                            } else {
                                if (errorCB) {
                                    errorCB(response.data);
                                }
                                console.error(response.data);
                                ToasterNotifierHandler.handleError(response);
                            }
                        });
            }

            // put the data from database
            function UpdateFn(user, successCB, errorCB) {

                $http({
                    method: 'PUT',
                    url: _endPointJSON + user.id,
                    data: user
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            // delete the data from database
            function RemoveFn(userId, successCB, errorCB) {

                $http({
                    method: 'DELETE',
                    url: _endPointJSON + userId
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response.data);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }


            return thisCrudService;
        }]);

